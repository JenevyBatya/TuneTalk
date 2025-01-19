import React, { useState, useEffect } from "react";
import {Box, Typography, Avatar, Chip, Divider} from "@mui/material";
import AudioPlayer from "../components/AudioPlayer";
import Comments from "../components/Comments";
import cardPhoto from '../assets/cardPhoto.svg';
import mockAudio from '../assets/SLAVA SKRIPKA Бобр.mp3';
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import SubscribeButton from "../components/ButtonForSubscribe";
import axios from "axios";
import { useParams } from "react-router-dom";



const AudioPodcastPage = () => {
    const id = useParams();
    const numericId = Number(id.id);

    const [podcast, setPodcast] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Функция для загрузки данных подкаста
        const fetchPodcast = async () => {
          try {
            // Запрос данных о подкасте по ID
            
            const response = await axios.get(`https://small-duck.ru/api/audio/${numericId}`);
            const podcastData = response.data;
            // Обновление состояния с данными подкаста
            setPodcast({
              audioSrc: `https://small-duck.ru/api/audio/${numericId}/stream`, // URL для потоковой передачи аудио
              name: podcastData.title,
              description: podcastData.description,
              author: podcastData.authorUsername, // Имя пользователя вместо email
              subscribers: Math.floor(Math.random() * 1000), // Примерное количество подписчиков
              tags: podcastData.categories,
              duration: podcastData.duration,
              cardPhoto: `https://small-duck.ru/api/uploads/${podcastData.coverFile}`, // Путь к файлу обложки
              likes: Math.floor(Math.random() * 500), // Примерное количество лайков
            });
    
            // Загружаем комментарии (если они есть)
            setComments([
              { id: 1, author: "Иван", text: "sigma sigma boy", avatar: "" },
            ]);
          } catch (error) {
            console.error("Ошибка при загрузке подкаста:", error);
          }
        };
    
        fetchPodcast();
      }, [id]);


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
            <Comments audioId={numericId} comments={comments} setComments={setComments}/>
        </Box>
        <FooterNavigation />
    </div>
);
};

export default AudioPodcastPage;
