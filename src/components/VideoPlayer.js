import React, {useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const VideoPlayer = ({videoSrc, duration, likes, cardPhoto, name}) => {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        setIsLiked((prev) => !prev);
    };
    return (
        <Box>
            <video
                src={videoSrc}
                controls
                style={{width: "100%", borderRadius: "8px"}}
                poster={cardPhoto}
            ></video>
            <Box sx={{display: "table", width: "100%", marginTop: 2}}>
                <Typography variant="h6" sx={{marginTop: 1}}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Длительность: {duration}
                </Typography>

                <Box sx={{display: "table-cell", textAlign: "right", paddingRight: 2}}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                        <IconButton
                            onClick={toggleLike}
                            sx={{padding: 0, color: isLiked ? "#FF6600" : "#ccc"}}
                        >
                            {isLiked ? (
                                <FavoriteIcon sx={{fontSize: 24}}/>
                            ) : (
                                <FavoriteBorderIcon sx={{fontSize: 24}}/>
                            )}
                        </IconButton>
                        <Typography sx={{marginLeft: 0.5}}>{likes + (isLiked ? 1 : 0)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default VideoPlayer;
