import React, { useState, useEffect } from "react";
import {Box, Typography, Avatar, Chip, Divider} from "@mui/material";
import AudioPlayer from "../components/AudioPlayer";
import Comments from "../components/Comments";
import cardPhoto from '../assets/cardPhoto.svg';
import mockAudio from '../assets/SLAVA SKRIPKA Бобр.mp3';
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import SubscribeButton from "../components/ButtonForSubscribe";


// Mock for podcast
const mockPodcastData = {
    audioSrc: mockAudio,
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
    { id: 1, author: "Иван", text: "sigma sigma boy", avatar: "" },
];


const AudioPodcastPage = () => {
    const [podcast, setPodcast] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // TODO change from mock to real request
        setPodcast(mockPodcastData);
        setComments(mockComments);
    }, []);

    if (!podcast) return <div>Загрузка...</div>;

    return (
        <div>
            <HeaderComponent />
            <Box sx={{ padding: 3, marginBottom: '15px' }}>
            <AudioPlayer audioSrc={podcast.audioSrc} duration={podcast.duration} likes={podcast.likes} cardPhoto={podcast.cardPhoto} name={podcast.name}/>

            {/* Автор и информация */}
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ bgcolor: "#757575", marginRight: 2 }}></Avatar>
                <Box>
                    <Typography variant="subtitle1">{podcast.author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {podcast.subscribers} подписчиков
                    </Typography>
                </Box>
                    <SubscribeButton/>
            </Box>

            {/* Теги */}
            <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 2}}>
                {podcast.tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={`#${tag}`}
                        sx={{
                            backgroundColor: "transparent",
                            color: "#FF6600",
                            marginRight: 1,
                            fontSize: 19,
                        }}
                    />
                ))}
            </Box>

            <Divider sx={{ marginY: 2 }} />
            <Comments comments={comments} setComments={setComments}/>
        </Box>
        <FooterNavigation />
    </div>
);
};

export default AudioPodcastPage;
