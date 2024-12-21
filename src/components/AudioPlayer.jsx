import React, {useState} from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AudioPlayer = ({ duration, likes, cardPhoto, name }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
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
                        borderRadius: '2vh',
                    }}
                ></Box>

                {/* Кнопка Play/Pause поверх */}
                <IconButton
                    onClick={togglePlay}
                    sx={{
                        position: "relative",
                        zIndex: 2,
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
            </Box>
            <Box sx={{ display: "table", width: "100%", marginTop: 2 }}>
            {/* Название выпуска */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "table-cell", textAlign: "left", paddingX: 2 }}
                >
                {name}
            </Typography>
            {/* Лайки */}
                <Box sx={{ display: "table-cell", textAlign: "right", paddingRight: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <FavoriteIcon sx={{ color: "#FF6600", marginRight: 0.5 }} />
                <Typography>{likes}</Typography>
            </Box>
                    </Box>
            </Box>
            {/* Прогресс-дорожка и длительность */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                    marginTop: 2,
                    marginBottom: 2,
                }}
            >
                {/* Прогресс-дорожка */}
                <Box
                    sx={{
                        flex: 1,
                        height: 4,
                        backgroundColor: "#AECBC9",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        marginRight: 2,
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: "30%", // процент текущего прогресса
                            backgroundColor: "#173E47",
                            position: "absolute",
                            left: 0,
                            top: 0,
                        }}
                    />
                </Box>

                {/* Длительность */}
                <Typography variant="body2" color="text.secondary">
                    {duration}
                </Typography>
            </Box>
        </Box>
    );
};

export default AudioPlayer;
