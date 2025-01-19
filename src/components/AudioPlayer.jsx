import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const AudioPlayer = ({ audioSrc, likes, cardPhoto, name }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const audioRef = React.createRef();
    const skipTime = 30;

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.ontimeupdate = () => {
                setCurrentTime(audioElement.currentTime);
            };
            audioElement.onloadedmetadata = () => {
                setTrackDuration(audioElement.duration);
            };
        }
    }, []);

    const togglePlay = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (value) => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.currentTime = value;
            setCurrentTime(value);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const toggleLike = () => {
        setIsLiked((prev) => !prev);
    };
    const skipForward = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const newTime = Math.min(audioElement.currentTime + skipTime, trackDuration);
            handleSeek(newTime);
        }
    };

    const skipBackward = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const newTime = Math.max(audioElement.currentTime - skipTime, 0);
            handleSeek(newTime);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Верхняя часть - обложка с кнопкой плеера */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Размытый фон */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${cardPhoto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(1.5px) brightness(0.8)",
                        zIndex: 1,
                        borderRadius: "2vh",
                    }}
                ></Box>

                {/* Кнопки поверх */}
                <Box sx={{ display: "flex", alignItems: "center", zIndex: 2 }}>
                    {/* Перемотка назад */}
                    <IconButton
                        onClick={skipBackward}
                        sx={{
                            width: 62,
                            height: 62,
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            color: "#173E47",
                            opacity: 0.75,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "&:hover": {
                                backgroundColor: "#f1f1f1",
                            },
                            marginRight: 2,
                        }}
                    >
                        <FastRewindIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                <IconButton
                    onClick={togglePlay}
                    sx={{
                        width: 62,
                        height: 62,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        color: "#173E47",
                        opacity: 0.75,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                            backgroundColor: "#f1f1f1",
                        },
                    }}
                >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 36 }} /> : <PlayArrowIcon sx={{ fontSize: 36 }} />}
                </IconButton>
                    {/* Перемотка вперед */}
                    <IconButton
                        onClick={skipForward}
                        sx={{
                            width: 62,
                            height: 62,
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            color: "#173E47",
                            opacity: 0.75,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "&:hover": {
                                backgroundColor: "#f1f1f1",
                            },
                            marginLeft: 2,
                        }}
                    >
                        <FastForwardIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Название выпуска и лайки */}
            <Box sx={{ display: "table", width: "100%", marginTop: 2 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "table-cell", textAlign: "left", paddingX: 2 }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: "table-cell", textAlign: "right", paddingRight: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={toggleLike}
                            sx={{ padding: 0, color: isLiked ? "#FF6600" : "#ccc" }}
                        >
                            {isLiked ? (
                                <FavoriteIcon sx={{ fontSize: 24 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                            )}
                        </IconButton>
                        <Typography sx={{ marginLeft: 0.5 }}>{likes + (isLiked ? 1 : 0)}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Прогресс-дорожка и время */}
            <Box sx={{ display: "flex", flexDirection: "column", width: "90%", marginTop: 2, marginBottom: 2 }}>
                {/* Прогресс-дорожка */}
                <Box
                    sx={{
                        width: "100%",
                        height: 4,
                        backgroundColor: "#AECBC9",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                    }}
                    onClick={(e) => {
                        const box = e.target.getBoundingClientRect();
                        const clickX = e.clientX - box.left;
                        const percentage = clickX / box.width;
                        const newTime = trackDuration * percentage;
                        handleSeek(newTime);
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: `${(currentTime / trackDuration) * 100}%`,
                            backgroundColor: "#173E47",
                            position: "absolute",
                            left: 0,
                            top: 0,
                        }}
                    />
                </Box>

                {/* Время: Текущее время / Общая длительность */}
                <Typography
                    variant="body2"
                    color="#173E47"
                    sx={{
                        marginTop: 2,
                        textAlign: "left",
                        fontWeight: "bold",
                    }}
                >
                    {`${formatTime(currentTime)} / ${formatTime(trackDuration)}`}
                </Typography>
            </Box>

            {/* Вставка аудио элемента */}
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
        </Box>
    );
};

export default AudioPlayer;