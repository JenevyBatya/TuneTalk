// import React, { useState, useRef, useEffect } from 'react';
// import 'rc-slider/assets/index.css';
// import axios from 'axios';
// import { styled, ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
// import {
//     AppBar,
//     Avatar,
//     Box,
//     Button,
//     Card,
//     CardContent,
//     CardMedia,
//     Container,
//     IconButton, Tab,
//     Toolbar,
//     Typography,
//     Slider,
//     TextField,
//     SliderValueLabel,
//     duration
// } from '@mui/material';
// import ava from "../assets/ava_photo.jpg";
// import Link from '@mui/icons-material/Link';
// import Star from '@mui/icons-material/Star';
// import FooterNavigation from './FooterComponent';
// import HeaderComponent from "../components/HeaderComponent";
// import { display, padding } from '@mui/system';
// import { hover } from '@testing-library/user-event/dist/hover';
// const TinyText = styled(Typography)({
//     fontSize: '0.75rem',
//     opacity: 0.38,
//     fontWeight: 500,
//     letterSpacing: 0.2,
//   });
// const minDistance = 30;
// function MinimumDistanceSlider(imageFile, title, description) {
//     const [fileInfo, setFileInfo] = useState({});
//     const [audioFile, setAudioFile] = useState(null);
//     const [audioBuffer, setAudioBuffer] = useState(null);
//     const [audioContext, setAudioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
//     const [trimFlag, setTrimFlag] = useState(0);
//     const [lowGain, setLowGain] = useState(1);
//     const [highGain, setHighGain] = useState(1);
//     useEffect(() => {
//         if (audioFile) {
//           const reader = new FileReader();
//           reader.onload = async () => {
//             const audioData = reader.result;
//             try {
//               const buffer = await audioContext.decodeAudioData(audioData);
//               setAudioBuffer(buffer);
//               setFileInfo({
//                 format: audioFile.type,
//                 bitrate: Math.round(Math.round(audioFile.size) / (Math.round(buffer.duration) * 128)), // Считаем грубо
//                 duration: Math.floor(buffer.duration),
//               });
//             } catch (error) {
//               console.error("Error decoding audio file", error);
//             }
//           };
//           reader.readAsArrayBuffer(audioFile);
//         }
//       }, [audioFile, audioContext]);
//     const handleAudioFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           setAudioFile(file);
//         }
//     };
//     const [value1, setValue1] = React.useState([0, 30]);
//     function formatDuration(value) {
//         const hour = Math.floor(value / 3600);
//         const minute = Math.floor((value / 60 ) % 60);
//         const secondLeft =(value % 60);
//         return `${hour>9 ? hour : `0${hour}`}:${minute>9 ? minute : `0${minute}`}:${secondLeft>9 ? secondLeft : `0${secondLeft}`}`;
//     }  
//     const handleChange = (event, newValue, activeThumb) => {
//         if (!Array.isArray(newValue)) {
//         return;
//         }
      
//         if (activeThumb === 0) {
//             setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
//         } else {
//             setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
//         }
//     };
//     const trimAudio = () => {
//         setTrimFlag(1);
//     };
//     const [error, setError] = useState("");
//     const publish = async (e) => {
//         if (!audioFile) {
//             // setError("Файл не выбран");
//             console.log(1)
//         } else if (!audioBuffer) {
//             // setError("Дождитесь загрузки файла");
//             console.log(2)
//         } else {
//             try {
//                 setError("");
//                 // Отправляем запрос на сервер
//                 const response = await axios.post('http://26.227.27.136:80/audio/upload', {
//                     title: title,
//                     description: description,
//                     trimFlag: trimFlag,
//                     cover: imageFile,
//                     ss: value1[0],
//                     to: value1[1],
//                     bitrate: fileInfo.bitrate,
//                     author: 'mock_username',
//                 });
//                 if (response.status === 201 || response.status === 200){
//                     // Перенаправление на другую страницу после успешной регистрации
//                     // history('/library'); // После регистрации перенаправляем на /library
//                 } else {
//                     alert('Login is unavailable')
//                 }
//             } catch (error) {
//                 if (error.status === 400){
//                     setError("You should fill all fields");
//                 }
//                 if (error.status === 418){
//                     setError("Email is already taken");
//                 }
//                 if (error.status === 427){
//                     setError("Username is already taken");
//                 }
//                 console.log(error);
//             }
//         }
//     };
//     return (
//         <Box sx={{ width: '80%'}} maxWidth={'80%'} marginLeft={'10%'} marginRight={'10%'}>
//             <input type="file" accept="audio/*" onChange={handleAudioFileChange} />
//             <Slider name='trim-slider'
//                 getAriaLabel={() => 'Minimum distance'}
//                 value={value1}
//                 min={0}
//                 max={fileInfo.duration || 180}
//                 onChange={handleChange}
//                 valueLabelDisplay="off"
//                 disableSwap
//                 size='small'
//             />
//             <Box
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     mt: -2,
//                 }}>
//                 <TinyText>{formatDuration(value1[0])}</TinyText>
//                 <TinyText>{formatDuration(value1[1])}</TinyText>
//             </Box>
//             <button onClick={trimAudio}>Trim</button>
//             <Box display="flex" alignItems="start" mb={3} sx={{lineHeight: 1, backgroundColor:"#F1F1F1"}} marginTop='0.5em' borderRadius={10} width={'90%'} ml='5%' mr='5%' flexDirection={'column'}>
//                 <Typography variant="h6" sx={{fontSize: {xs: '1.1rem', sm: '1.2rem', md: '1.3rem'}}}  width={'90%'} ml={'5%'} mr={'5%'} padding={'2%'}>
//                         Параметры файла:
//                 </Typography>
//                 <Box display='flex' alignItems={'start'} marginTop='0.2em' flexDirection={'row'} width='90%' ml='5%' mr={'5%'}>
//                 <p>Format: {fileInfo.format}</p>
//                 <p>Bitrate: <TextField >{fileInfo.bitrate}</TextField> kbps</p>
//                 <p>Duration: {fileInfo.duration}s</p>
//                 {/* <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 value={lowGain}
//                 onChange={(e) => setLowGain(e.target.value)}
//                 title="Adjust Low Frequencies"
//                 />
//                 <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 value={highGain}
//                 onChange={(e) => setHighGain(e.target.value)}
//                 title="Adjust High Frequencies"
//                 /> */}
//                 </Box>
//             </Box>
//             <button onClick={publish}>Опубликовать</button>
//         </Box>
//     );
// }

// const AudioCutter = () => {
//     const [imageFile, setImageFile] = useState(ava);
//     const [title, setTitle] = useState('Название');
//     const [description, setDescription] = useState('Описание')
//     const handleImageFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           setImageFile(file);
//         }
//     };
//     return (
//         <Container maxWidth="md"
//                    sx={{bgcolor: '#ffffff', pt: 0, pl: 0}}>
//             <HeaderComponent/>
//             <Box display="flex" alignItems="center" mb={3}>
//                 {/* <Avatar
//                     src={ava}
//                     alt="Имя Фамилия"
//                     sx={{
//                         width: {xs: 140, sm: 150, md: 200},
//                         height: {xs: 140, sm: 150, md: 200},
//                         mr: "5vw",
//                         borderRadius: 10
//                     }}
//                     variant="rounded"
//                 /> */}
//                 <input type="file" accept="image/*" onChange={handleImageFileChange}/>

//                 <Box sx={{
//                     display: 'flex', flexDirection: 'column', alignItems: 'start',
//                     height: {xs: 140, sm: 160, md: 200},
//                     justifyContent: 'space-between'
//                 }}>
//                     <TextField
//                         label="Название"
//                         fullWidth
//                         rows={2}
//                         size='small'
//                         variant='standard'
//                         slotProps={{
//                             input: {
//                                 disableUnderline: true,
//                                 multiline: true
//                             },
//                         }}
//                         sx={{
//                             "& textarea": {
//                                 minHeight: "10px",
//                             },
//                         }}
//                         onChange={setTitle}
//                     />
//                     <TextField
//                         label="Описание"
//                         rows={2}
//                         fullWidth
//                         size='small'
//                         sx={(t)=>({
//                             marginTop: '0.5em',
//                             "& textarea": {
//                                 minHeight: "10px",
//                             },
//                         })}
//                         variant='standard'
//                         slotProps={{
//                             input: {
//                                 disableUnderline: true,
//                                 multiline: true
//                             },
//                         }}
//                         onChange={setDescription}
//                     />
//                     <Typography variant="h6" sx={{fontSize: {xs: '0.9rem', sm: '1rem', md: '1.1rem'}, lineHeight: 1}} marginTop='0.5em'>
//                         Теги:
//                     </Typography>
//                 </Box>
//             </Box>
//             {MinimumDistanceSlider(imageFile, title, description)}
//             <FooterNavigation/>
//         </Container>
//     );
// };


// export default AudioCutter;

import React, { useState, useRef, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import { Box, Slider, Button, Typography, Container, TextField } from '@mui/material';
import FooterNavigation from './FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

const AudioCutter = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [trimmedBuffer, setTrimmedBuffer] = useState(null);
    const [gainNode, setGainNode] = useState(null);
    const [volume, setVolume] = useState(1);
    const [title, setTitle] = useState('Название');
    const [description, setDescription] = useState('Описание');
    const [coverFile, setCoverFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [coverPreview, setCoverPreview] = useState(null);
    const [range, setRange] = useState([0, 30]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioSourceRef = useRef(null);
    const animationRef = useRef(null);
    const [isTrimmed, setIsTrimmed] = useState(false);
    const [wasPlaying, setWasPlaying] = useState(false);
    const [tags, setTags] = useState(['tag1', 'tag2']);  //MOCK
    const [authorEmail, setAuthorEmail] = useState('s@gmail.com'); //MOCK

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

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
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

    const handlePlaybackSliderChange = (event, newValue) => {
        setIsDragging(true);
        if (isPlaying) {
            stopAudio();
            setWasPlaying(true);
        }
        setPlaybackPosition(newValue);
    };

    const handlePlaybackSliderCommit = () => {
        setIsDragging(false);
        if (wasPlaying) {
            stopAudio();
            playAudio();
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
            const duration = Math.floor(renderedBuffer.length / renderedBuffer.sampleRate);
            const wavBlob = encodeWAV(interleaved, renderedBuffer.sampleRate, renderedBuffer.numberOfChannels);
            const formData = new FormData();
            formData.append('file', wavBlob, isTrimmed ? 'trimmed-audio.wav' : 'original-audio.wav');
            if (coverFile) {
                formData.append('cover', coverFile);
            }
            console.log(tags);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tags', tags);
            formData.append('authorEmail', authorEmail);
            formData.append('duration', duration)
    
            try {
                await axios.post('http://localhost:80/audio/upload', formData, {//http://26.227.27.136:80/audio/upload
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                //alert('Наконец-то!');
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

    return (
        <Container maxWidth="md"
                   sx={{bgcolor: '#ffffff', pt: 0, pl: 0}}>
        <HeaderComponent/>
        <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'start',
                    height: {xs: 140, sm: 160, md: 200},
                    justifyContent: 'space-between'
                }}>
                    <input type="file" accept="image/*" onChange={handleCoverFileChange} />
            {coverPreview && (
                <Box sx={{ margin: '20px 0' }}>
                    <img src={coverPreview} alt="Cover Preview" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block', margin: '10px auto'    }} />
                </Box>
            )}
                    <TextField
                        label="Название"
                        fullWidth
                        rows={2}
                        size='small'
                        variant='standard'
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                multiline: true
                            },
                        }}
                        sx={{
                            "& textarea": {
                                minHeight: "10px",
                            },
                        }}
                        onChange={setTitle}
                    />
                    <TextField
                        label="Описание"
                        rows={2}
                        fullWidth
                        size='small'
                        sx={(t)=>({
                            marginTop: '0.5em',
                            "& textarea": {
                                minHeight: "10px",
                            },
                        })}
                        variant='standard'
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                multiline: true
                            },
                        }}
                        onChange={setDescription}
                    />
                    <Typography variant="h6" sx={{fontSize: {xs: '0.9rem', sm: '1rem', md: '1.1rem'}, lineHeight: 1}} marginTop='0.5em'>
                        Теги:
                    </Typography>
                </Box>
        <Box sx={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
            <input type="file" accept="audio/*" onChange={handleAudioFileChange} />
            {audioBuffer && (
                <>
                    <Slider
                        value={range}
                        min={0}
                        max={Math.floor(audioBuffer.duration)}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                    />
                    <Typography>
                        Trim Range: {range[0]}s - {range[1]}s
                    </Typography>
                    <Typography>
                        Playback Position: {playbackPosition.toFixed(2)}s
                    </Typography>
                    <Slider
                        value={playbackPosition}
                        min={0}
                        max={isTrimmed ? trimmedBuffer.duration : audioBuffer.duration}
                        onChange={handlePlaybackSliderChange}
                        onChangeCommitted={handlePlaybackSliderCommit}
                        valueLabelDisplay="auto"
                    />
                    <Typography>Volume</Typography>
                    <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        valueLabelDisplay="off"
                    />
                    <Button variant="contained" onClick={trimAudio}>Trim</Button>
                    <Button variant="contained" onClick={playAudio}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button variant="contained" onClick={uploadAudio} disabled={!audioBuffer || !title.trim()} >Upload</Button>
                </>
            )}
        </Box>
        <FooterNavigation/>
        </Container>
    );
};

export default AudioCutter;

