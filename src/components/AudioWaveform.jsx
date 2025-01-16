import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioWaveform = ({ audioFile, playbackPosition, isPlaying }) => {
    const waveformRef = useRef(null);
    const waveSurferRef = useRef(null);

    useEffect(() => {
        if (audioFile && waveformRef.current) {
            waveSurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#FF7510',
                progressColor: '#173E47',
                cursorColor: '#173E47',
                barWidth: 2,
                barRadius: 2,
                cursorWidth: 1,
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                waveSurferRef.current.load(reader.result);
            };
            reader.readAsDataURL(audioFile);

            return () => {
                waveSurferRef.current.destroy();
            };
        }
    }, [audioFile]);
    useEffect(() => {
        if (isPlaying && waveSurferRef.current) {
            waveSurferRef.current.seekTo(playbackPosition / waveSurferRef.current.getDuration());
        }
    }, [playbackPosition, isPlaying]);
    return (
        <div>
            <div
                ref={waveformRef}
                style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#f1f1f1',
                    borderRadius: '8px',
                    marginTop: '20px',
                }}
            ></div>
        </div>
    );
};

export default AudioWaveform;
