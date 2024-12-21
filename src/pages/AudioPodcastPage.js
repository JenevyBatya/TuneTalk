import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import AudioPlayer from "../components/AudioPlayer";
import Comments from "../components/Comments";
import cardPhoto from '../assets/cardPhoto.svg';


// Mock for podcast
const mockPodcastData = {
    name: "Name",
    description: "Description...",
    author: "Альфа-Банк",
    subscribers: 123,
    tags: ["tags", "tags", "tags"],
    duration: "21:02",
    cardPhoto: cardPhoto,
    likes: 233,
};

// Mock for comments
const mockComments = [
    { id: 1, author: "Иван", text: "Очень полезный выпуск, спасибо!", avatar: "" },
    { id: 2, author: "Мария", text: "Здорово", avatar: "" },
];

const AudioPodcastPage = () => {
    const [podcast, setPodcast] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Имитация загрузки данных
        setPodcast(mockPodcastData);
        setComments(mockComments);
    }, []);

    if (!podcast) return <div>Загрузка...</div>;

    return (
        <Box sx={{ padding: 3 }}>
            <AudioPlayer duration={podcast.duration} likes={podcast.likes} cardPhoto={podcast.cardPhoto} name={podcast.name}/>

            {/* Автор и информация */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ bgcolor: "#757575", marginRight: 2 }}></Avatar>
                <Box>
                    <Typography variant="subtitle1">{podcast.author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {podcast.subscribers} подписчиков
                    </Typography>
                </Box>
            </Box>

            {/* Теги */}
            <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2 }}>
                {podcast.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={`#${tag}`}
                        sx={{
                            backgroundColor: "transparent",
                            color: "#FF6600",
                            marginRight: 1,
                        }}
                    />
                ))}
            </Box>

            <Divider sx={{ marginY: 2 }} />
            <Comments comments={comments} />
        </Box>
    );
};

export default AudioPodcastPage;
