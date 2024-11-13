import React, {useEffect, useRef, useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    IconButton, Tab,
    Toolbar,
    Typography
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import Star from '@mui/icons-material/Star';
import Link from '@mui/icons-material/Link';

import ava from "../assets/cardPhoto.svg";
import playlistImage from "../assets/playlist.jpg";

const userStatus =
    {
        user: true,
        subscribed: true
    }

// let subscription = true;
const podcasts = [
    {
        id: 1,
        title: "Музыка для работы",
        description: "Подборка треков для продуктивной работы и сосредоточения.",
        author: "Кака",
        episodes: 45,
        subscribed: false
    },
    {
        id: 2,
        title: "Утренний заряд",
        description: "Энергичные треки для бодрого и успешного начала дня.",
        author: "Кика",
        episodes: 30,
        subscribed: false
    },
    {
        id: 3,
        title: "Классическая музыка",
        description: "Лучшие произведения классической музыки для полного релакса и вдохновения.",
        author: "Кока",
        episodes: 70,
        subscribed: true

    },
    {
        id: 4,
        title: "Ретро Хиты",
        description: "Старые добрые хиты 80-х и 90-х, которые всегда в моде.",
        author: "Кука",
        episodes: 50,
        subscribed: true

    },
    {
        id: 5,
        title: "Подкасты на каждый день",
        description: "Интересные подкасты на разные темы, которые развлекают и вдохновляют.",
        author: "Кека",
        episodes: 100,
        subscribed: true

    },
];
const playlists = [
    {
        id: 1,
        title: "Музыка для работы",
        description: "Подборка треков для продуктивной работы и сосредоточения.",
        episodes: 45,
    },
    {
        id: 2,
        title: "Утренний заряд",
        description: "Энергичные треки для бодрого и успешного начала дня.",
        episodes: 30,
    },
    {
        id: 3,
        title: "Классическая музыка",
        description: "Лучшие произведения классической музыки для полного релакса и вдохновения.",
        episodes: 70,
    },
    {
        id: 4,
        title: "Ретро Хиты",
        description: "Старые добрые хиты 80-х и 90-х, которые всегда в моде.",
        episodes: 50,
    },
    {
        id: 5,
        title: "Подкасты на каждый день",
        description: "Интересные подкасты на разные темы, которые развлекают и вдохновляют.",
        episodes: 100,
    },
];

export default function OtherProfilePage() {
    return (
        <Container maxWidth="md"
                   sx={{bgcolor: '#ffffff', pt: 3, pl: 0}}
        > {/* Увеличен верхний отступ для содержимого */}
            {/*<AppBar position="fixed" sx={{bgcolor: '#adcac8'}} elevation={0}>*/}
            {/*    <Toolbar sx={{height: 20}}/>*/}
            {/*</AppBar>*/}

            <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                    src={ava}
                    alt="Имя Фамилия"
                    sx={{
                        width: {xs: 140, sm: 150, md: 200},
                        height: {xs: 140, sm: 150, md: 200},
                        mr: "5vw",
                        borderRadius: 10
                    }}
                    variant="rounded"
                />

                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'start',
                    height: {xs: 140, sm: 160, md: 200},
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h4" sx={{fontSize: {xs: '1.3rem', sm: '2rem', md: '2.5rem'}}}>
                        Имя Фамилия
                    </Typography>
                    <Typography variant="h6" sx={{fontSize: {xs: '0.9rem', sm: '1rem', md: '1.2rem'}, lineHeight: 1}}>
                        Описание профиля текст текст текст
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{fontSize: {xs: '0.9rem', sm: '0.9rem'}}}
                                display="flex" gap={1}>
                        <Link/> vk.com/user
                    </Typography>
                    <ButtonSubscribe item={userStatus}/> {/*</Box>*/}
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2} sx={{fontSize: {xs: '0.4rem', sm: '0.9rem'}}}>
                <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem'}}}>27 подписчиков</Typography>
                <Star sx={{width: 15, height: 15, color: '#cbcbcb'}}/>
                <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem'}}}>256 подписок</Typography>
                <Star sx={{width: 15, height: 15, color: '#cbcbcb'}}/>
                <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem'}}}>7 подкастов</Typography>
            </Box>

            {ButtonGroup()}

        </Container>
    );
}


// Компонент для рендеринга одной карточки плейлиста
function PlaylistCard({item}) {
    const cardRef = useRef(null);
    const [cardSize, setCardSize] = useState({width: 0, height: 0});

    // Получаем размеры карточки после рендера
    useEffect(() => {
        if (cardRef.current) {
            const {width, height} = cardRef.current.getBoundingClientRect();
            setCardSize({width, height});
        }
    }, []);

    const truncateDescription = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    return (
        <Box position="relative" mb={2} key={item.id}>
            <Card ref={cardRef} sx={{position: 'relative', zIndex: 1, mb: 2, borderRadius: 10}}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={0}>
                    <CardContent>
                        <Box sx={{flexDirection: 'column', height: {xs: 150, sm: 180, md: 200}}} display="flex"
                             justifyContent="space-between">
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem'},
                                        lineHeight: 1.2,
                                        height: {xs: '40px', sm: '65px', md: '70px'}
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" sx={{
                                    fontSize: {xs: '0.7rem', sm: '0.8rem'},
                                    height: {xs: '50px', sm: '65px', md: '70px'},
                                    lineHeight: 1.2
                                }}>
                                    {truncateDescription(item.description, 4)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
                                    {item.episodes} выпуска
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: {xs: '80px', sm: '100px', md: '150px'},
                                        height: {xs: '40px', sm: '45px', md: '50px'},
                                        borderRadius: 10,
                                        bgcolor: "#173e47"
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: {xs: '0.6rem', sm: '0.8rem', md: '1rem'}
                                    }}>Слушать</Typography>
                                </Button>
                                <IconButton><ShareIcon/></IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="start">
                        <CardMedia
                            component="img"
                            sx={{
                                width: {xs: 120, sm: 150, md: 200},
                                height: {xs: 140, sm: 150, md: 200},
                                borderRadius: 10,
                            }}
                            image={playlistImage} // Замените на фактический путь к изображению
                            alt="Плейлист обложка"
                        />
                        <IconButton>
                            <FavoriteBorderIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Card>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: cardSize.width,
                    height: cardSize.height,
                    backgroundColor: 'rgb(191,238,1)', // Полупрозрачный слой
                    zIndex: 0
                }}
            />
        </Box>
    );
}

// Основной компонент
function RenderPlaylistCards() {
    if (playlists.length === 0) {
        return <Typography variant="h6" sx={{mt: 2}} textAlign="center">У вас пока нету плейлистов</Typography>;
    }

    return playlists.map((item) => <PlaylistCard key={item.id} item={item}/>);
}


function ButtonSubscribe({item}) {
    // Состояние подписки (по умолчанию false — не подписан)
    const [isSubscribed, setIsSubscribed] = useState(item.subscribed);

    // Обработчик клика для изменения состояния
    const handleSubscriptionToggle = () => {
        setIsSubscribed(prevState => !prevState);
    };

    return (
        <Box sx={{position: 'relative', height: {xs: '30px', sm: '35px', md: '40px'},}}>
            <Box sx={{
                position: 'absolute',
                width: item.user === true ? {xs: '120px', sm: '140px', md: '150px'} : {
                    xs: '100px',
                    sm: '140px',
                    md: '150px'
                },
                height: {xs: '30px', sm: '35px', md: '40px'},
                bgcolor: 'black',
                zIndex: 0,
                opacity: isSubscribed ? 1 : 0
            }}/>
            <Button
                variant="contained"
                onClick={handleSubscriptionToggle}
                sx={{
                    width: item.user === true ? {xs: '120px', sm: '140px', md: '150px'} : {
                        xs: '100px',
                        sm: '140px',
                        md: '150px'
                    },
                    height: {xs: '30px', sm: '35px', md: '40px'},
                    zIndex: 1,
                    bgcolor: isSubscribed ? '#ffffff' : '#173e47', // Синий для "отписаться", черный для "подписаться"
                    borderRadius: 10,

                }}
            >
                <Typography sx={{
                    fontSize: {xs: '0.6rem', sm: '0.8rem', md: '1rem'},
                    color: isSubscribed ? '#000000' : '#ffffff'
                }}>
                    {isSubscribed ? 'отписаться' : 'подписаться'}
                </Typography>
            </Button>
        </Box>

    );
}

function ButtonGroup() {
    const [activeButton, setActiveButton] = useState('подкасты');
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    // const RenderContent = () => {
    //     switch (activeButton) {
    //         case 'подкасты':
    //             return RenderWholePart("Новый подкаст", RenderPodcastCards())
    //         case 'плейлист':
    //             return RenderWholePart("Новый плейлист", RenderPlaylistCards())
    //     }
    // }
    const buttonStyle = (button) => ({
        width: {xs: '90px', sm: '100px', md: '150px'},
        height: {xs: '30px', sm: '35px', md: '40px'},
        zIndex: 1,
        bgcolor: activeButton === button ? '#fd7510' : '#ffffff',
        color: 'black',
        borderRadius: 10,
    });

    const boxStyle = (button) => ({
        position: 'absolute',
        width: {xs: '90px', sm: '100px', md: '150px'},
        height: {xs: '30px', sm: '35px', md: '40px'},
        bgcolor: '#fd7510',
        opacity: activeButton === button ? 0 : 1, // Если кнопка активна, делаем бокс прозрачным
        zIndex: 0,
    });
    return (
        <Box>
            <Box display="flex" justifyContent="start" alignItems="center" gap={2} mb={2} width="100%">
                {/* Кнопка подкасты */}
                <Box sx={{position: 'relative', height: {xs: '30px', sm: '35px', md: '40px'}}}>
                    <Box sx={boxStyle('подкасты')}/>
                    <Button variant="contained" sx={buttonStyle('подкасты')}
                            onClick={() => handleButtonClick('подкасты')}>
                        <Typography sx={{fontSize: {xs: '0.6rem', sm: '0.8rem', md: '1rem'}}}>подкасты</Typography>
                    </Button>
                </Box>

                {/* Кнопка плейлист */}
                <Box sx={{position: 'relative', height: {xs: '30px', sm: '35px', md: '40px'}}}>
                    <Box sx={boxStyle('плейлист')}/>
                    <Button variant="contained" sx={buttonStyle('плейлист')}
                            onClick={() => handleButtonClick('плейлист')}>
                        <Typography sx={{fontSize: {xs: '0.6rem', sm: '0.8rem', md: '1rem'}}}>плейлист</Typography>
                    </Button>
                </Box>
            </Box>
            {activeButton === 'подкасты' && <RenderPodcastCards/>}
            {activeButton === 'плейлист' && <RenderPlaylistCards/>}
            {/*{RenderContent()}*/}
        </Box>
    );
}


// Компонент для рендеринга одной карточки подкаста
function PodcastCard({item}) {
    const cardRef = useRef(null);
    const [cardSize, setCardSize] = useState({width: 0, height: 0});
    const [isSubscribed, setIsSubscribed] = useState(item.subscribed);

    // Получаем размеры Card после рендеринга
    useEffect(() => {
        if (cardRef.current) {
            const {width, height} = cardRef.current.getBoundingClientRect();
            setCardSize({width, height});
        }
    }, []);

    const truncateDescription = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };
    const handleLikeButtonClick = () => {
        setIsSubscribed(!isSubscribed); // Переключаем состояние кнопки
    };

    return (
        <Box position="relative" mb={2} key={item.id}>
            <Card ref={cardRef} sx={{position: 'relative', zIndex: 1, mb: 2, borderRadius: 10}}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={0}>
                    <CardContent>
                        <Box sx={{flexDirection: 'column', height: {xs: 150, sm: 180, md: 200}}} display="flex"
                             justifyContent="space-between">
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem'},
                                        lineHeight: 1.2,
                                        height: {xs: '40px', sm: '65px', md: '70px'}
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" sx={{
                                    fontSize: {xs: '0.7rem', sm: '0.8rem'},
                                    height: {xs: '40px', sm: '65px', md: '70px'},
                                    lineHeight: 1.2
                                }}>
                                    {truncateDescription(item.description, 2)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
                                    {item.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"
                                            sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
                                    {item.episodes} выпуска
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <ButtonSubscribe item={item}/>
                                <IconButton><ShareIcon/></IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="start"
                         sx={{fontSize: {xs: '0.7rem', sm: '0.8rem'}}}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: {xs: 120, sm: 150, md: 200},
                                height: {xs: 140, sm: 150, md: 200},
                                borderRadius: 10,
                                mr: 10
                            }}

                            image={playlistImage} // Замените на фактический путь к изображению
                            alt="Плейлист обложка"
                        />

                    </Box>
                </Box>
            </Card>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: cardSize.width,
                    height: cardSize.height,
                    backgroundColor: 'rgb(191,238,1)', // Полупрозрачный слой
                    zIndex: 0
                }}
            />
        </Box>
    );
}

// Основной компонент для рендеринга всех подкастов
function RenderPodcastCards() {
    if (podcasts.length === 0) {
        return <Typography variant="h6" sx={{mt: 2}} textAlign="center">У вас пока нету подкастов</Typography>;
    }

    return podcasts.map((item) => (
        <PodcastCard key={item.id} item={item}/>
    ));
}




