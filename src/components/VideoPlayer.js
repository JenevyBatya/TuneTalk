import React from "react";
import { Box, Typography } from "@mui/material";

const VideoPlayer = ({ videoSrc, duration, likes, cardPhoto, name }) => {
    return (
        <Box>
            <iframe
                width="100%"
                height="400"
                src={videoSrc}
                title={name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px" }}
            ></iframe>
            <Typography variant="h6" sx={{ marginTop: 1 }}>
                {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Длительность: {duration} | Лайков: {likes}
            </Typography>
        </Box>
    );
};

export default VideoPlayer;
