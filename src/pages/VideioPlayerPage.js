import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import Comments from "../components/Comments";
import cardPhoto from '../assets/cardPhoto.svg';
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import SubscribeButton from "../components/ButtonForSubscribe";

const mockVideoPodcastData = {
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    name: "Самый хороший подкаст",
    description: "Description of the video podcast...",
    author: "Азамат Мусагалиев",
    subscribers: 456,
    tags: ["юмор", "развитие"],
    duration: "45:32",
    cardPhoto: cardPhoto,
    likes: 567,
};

const mockComments = [
    { id: 1, author: "Иван", text: "Отличный видеоподкаст!", avatar: "" },
    { id: 2, author: "Мария", text: "поняла.", avatar: "" },
];

const VideoPodcastPage = () => {
    const [podcast, setPodcast] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setPodcast(mockVideoPodcastData);
        setComments(mockComments);
    }, []);

    if (!podcast) return <div>Загрузка...</div>;

    return (
        <div>
            <HeaderComponent />
            <Box sx={{ padding: 3 }}>
                <VideoPlayer
                    videoSrc={podcast.videoSrc}
                    duration={podcast.duration}
                    likes={podcast.likes}
                    cardPhoto={podcast.cardPhoto}
                    name={podcast.name}
                />

                {/* Автор и информация */}
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Avatar sx={{ bgcolor: "#757575", marginRight: 2 }}></Avatar>
                    <Box>
                        <Typography variant="subtitle1">{podcast.author}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {podcast.subscribers} подписчиков
                        </Typography>
                    </Box>
                    <SubscribeButton />
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
                                fontSize: 19,
                            }}
                        />
                    ))}
                </Box>

                <Divider sx={{ marginY: 2 }} />
                <Comments comments={comments} setComments={setComments}/>
            </Box>
            <div style={{ marginBottom: '20%' }}>
                <FooterNavigation />
            </div>
        </div>
    );
};

export default VideoPodcastPage;
