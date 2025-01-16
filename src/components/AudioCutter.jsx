import React, { useState, useRef, useEffect } from 'react';
import {Box, Slider, Button, Typography} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {styled} from "@mui/system";
import axios from "axios";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {StyledButton} from "./CustomCard";
import AudioWaveform from "./AudioWaveform";


export const AudioCutterStyledButton = styled(Button)(({theme}) => ({

    backgroundColor: '#C0EF00',
    color: '#000',
    padding: '10px',
    fontWeight: 'bold',
    borderRadius: '13px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#C0EF00',
    },
}));

const AudioCutter = ({coverFile, title, description, tags, username}) => {
    const [audioFile, setAudioFile] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [trimmedBuffer, setTrimmedBuffer] = useState(null);
    const [gainNode, setGainNode] = useState(null);
    const [volume, setVolume] = useState(1);
    const [range, setRange] = useState([0, 0]);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isTrimmed, setIsTrimmed] = useState(false);
    const [wasPlaying, setWasPlaying] = useState(false);

    const audioSourceRef = useRef(null);
    const animationRef = useRef(null);
    const fileInputRef = useRef(null);


    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        const gain = context.createGain();
        gain.connect(context.destination);
        setGainNode(gain);
    }, []);

    const handleAudioFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && audioContext) {
            setAudioFile(file);
            const reader = new FileReader();
            reader.onload = async () => {
                const arrayBuffer = reader.result;
                const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
                setAudioBuffer(decodedBuffer);
                setRange([0, Math.floor(decodedBuffer.duration)]);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleRangeChange = (event, newValue) => {
        setRange(newValue);
    };

    const trimAudio = () => {
        if (audioBuffer) {
            stopAudio();
            const [start, end] = range;
            const sampleRate = audioBuffer.sampleRate;
            const startSample = Math.floor(start * sampleRate);
            const endSample = Math.floor(end * sampleRate);
            const trimmedLength = endSample - startSample;

            const trimmedBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                trimmedLength,
                sampleRate
            );

            for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
                const channelData = audioBuffer.getChannelData(i);
                trimmedBuffer.copyToChannel(channelData.subarray(startSample, endSample), i);
            }

            setTrimmedBuffer(trimmedBuffer);
            setIsTrimmed(true);
            setPlaybackPosition(0);
        }
    };

    const playAudio = () => {
        const bufferToPlay = isTrimmed ? trimmedBuffer : audioBuffer;
        if (bufferToPlay && !isPlaying) {
            const source = audioContext.createBufferSource();
            source.buffer = bufferToPlay;
            source.connect(gainNode);
            source.start(0, playbackPosition);
            audioSourceRef.current = source;
            setIsPlaying(true);

            const startTime = audioContext.currentTime - playbackPosition;

            const updatePosition = () => {
                if (!isDragging) {
                    const currentTime = audioContext.currentTime - startTime;
                    setPlaybackPosition(currentTime);
                    if (currentTime < bufferToPlay.duration) {
                        animationRef.current = requestAnimationFrame(updatePosition);
                    } else {
                        stopAudio();
                    }
                }
            };

            updatePosition();

            source.onended = () => {
                stopAudio();
            };
        } else if (isPlaying) {
            stopAudio();
        }
    };

    const stopAudio = () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current = null;
            setIsPlaying(false);
            setWasPlaying(false);
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (gainNode) {
            gainNode.gain.value = newValue;
        }
    };

    const uploadAudio = async () => {
        const bufferToUpload = isTrimmed ? trimmedBuffer : audioBuffer;
        if (bufferToUpload) {
            const offlineContext = new OfflineAudioContext(
                bufferToUpload.numberOfChannels,
                bufferToUpload.length,
                bufferToUpload.sampleRate
            );
            const bufferSource = offlineContext.createBufferSource();
            bufferSource.buffer = bufferToUpload;
            bufferSource.connect(offlineContext.destination);
            bufferSource.start();

            const renderedBuffer = await offlineContext.startRendering();

            const interleaved = new Float32Array(
                renderedBuffer.length * renderedBuffer.numberOfChannels
            );

            for (let channel = 0; channel < renderedBuffer.numberOfChannels; channel++) {
                const channelData = renderedBuffer.getChannelData(channel);
                for (let i = 0; i < renderedBuffer.length; i++) {
                    interleaved[i * renderedBuffer.numberOfChannels + channel] = channelData[i];
                }
            }

            const wavBlob = encodeWAV(interleaved, renderedBuffer.sampleRate, renderedBuffer.numberOfChannels);
            const formData = new FormData();
            formData.append('file', wavBlob, isTrimmed ? 'trimmed-audio.wav' : 'original-audio.wav');
            if (coverFile) {
                formData.append('cover', coverFile);
            }
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('username', username);

            try {
                await axios.post('http://138.124.127.129/api/audio/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    };

    function encodeWAV(samples, sampleRate, numChannels) {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        const writeString = (view, offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2 * numChannels, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        let offset = 44;
        for (let i = 0; i < samples.length; i++) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            offset += 2;
        }

        return new Blob([view], { type: 'audio/wav' });
    }
    const formatTime = (time) => {
        const hours = String(Math.floor(time / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const seconds = String(Math.floor(time % 60)).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom='2vh'>
                <AudioCutterStyledButton onClick={() => fileInputRef.current.click()} sx={{marginLeft: '20px'}}>
                    Загрузить файл +
                </AudioCutterStyledButton>
                {audioFile && (
                    <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '10px' }}>
                        Загружен файл: {audioFile.name}
                    </Typography>
                )}
            </Box>
            <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                style={{ display: 'none' }}
            />
            {audioBuffer && (
                <Box
                    sx={{
                        backgroundColor: '#f1f1f1',
                        padding: '20px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        maxWidth: '400px',
                        margin: '0 auto',
                    }}
                >
                    <Slider
                        value={range}
                        min={0}
                        max={Math.floor(audioBuffer.duration)}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        sx={{
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#FF7510',
                                width: 12,
                                height: 12,
                                borderRadius: '4px',
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#ff7e00',
                                opacity: 0.5,
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#FF7510',
                                border: 'none',
                            },
                        }}
                    />
                    <Typography>Trim Range: {range[0]}s - {range[1]}s</Typography>
                    <StyledButton variant="contained" onClick={trimAudio}>Trim</StyledButton>
                    <AudioWaveform audioFile={audioFile}
                                   playbackPosition={playbackPosition}
                                   isPlaying={isPlaying}
                    />
                    <Typography>
                        {formatTime(playbackPosition)} / {formatTime(audioBuffer.duration)}
                    </Typography>
                    <StyledButton variant="contained" onClick={playAudio}>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </StyledButton>
                    <Typography>Volume</Typography>
                    <Box display="flex" alignItems="center" gap="10px">
                        <VolumeUpIcon/>
                    <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        sx={{
                            flex: 1,
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#FF7510',
                                width: 12,
                                height: 12,
                                borderRadius: '4px',
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: '#ff7e00',
                                opacity: 0.5,
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#FF7510',
                                border: 'none',
                            },
                        }}
                    />
                    </Box>
                </Box>
            )}
            {audioBuffer && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '15px',
                }}>
                    <StyledButton
                        variant="contained"
                        onClick={uploadAudio}
                        sx={{
                            backgroundColor: '#C0EF00',
                            color: '#000',
                            fontWeight: 'bold',
                            marginBottom: '100px',
                        }}
                        disabled={!audioBuffer || !title.trim()}
                    >
                        Upload
                    </StyledButton>
                </Box>
            )}
        </Box>
    );
};

export default AudioCutter;