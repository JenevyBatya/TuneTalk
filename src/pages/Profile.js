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
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Star from '@mui/icons-material/Star';
import Link from '@mui/icons-material/Link';

import ava from "../assets/cardPhoto.svg";
import playlistImage from "../assets/Playlist.svg";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import playlistCardStyles from "../styles/PlaylistCardStyles";
import podcastCardStyles from '../styles/PodcastCardStyles';
import buttonGroupStyles from '../styles/ButtonGroupStyles';
import underlineButtonStyles from '../styles/UnderlinedButtonsStyles';
import profilePageStyles from '../styles/ProfilePageStyles';


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
        subscribed: false,
        liked: false
    },
    {
        id: 2,
        title: "Утренний заряд",
        description: "Энергичные треки для бодрого и успешного начала дня.",
        author: "Кика",
        episodes: 30,
        subscribed: false,
        liked: true
    },
    {
        id: 3,
        title: "Классическая музыка",
        description: "Лучшие произведения классической музыки для полного релакса и вдохновения.",
        author: "Кока",
        episodes: 70,
        subscribed: true,
        liked: true

    },
    {
        id: 4,
        title: "Ретро Хиты",
        description: "Старые добрые хиты 80-х и 90-х, которые всегда в моде.",
        author: "Кука",
        episodes: 50,
        subscribed: true,
        liked: true

    },
    {
        id: 5,
        title: "Подкасты на каждый день",
        description: "Интересные подкасты на разные темы, которые развлекают и вдохновляют.",
        author: "Кека",
        episodes: 100,
        subscribed: true,
        liked: false

    },
];
const playlists = [
    {
        id: 1,
        title: "Музыка для работы",
        description: "Подборка треков для продуктивной работы и сосредоточения.",
        episodes: 45,
        closed: true
    },
    {
        id: 2,
        title: "Утренний заряд",
        description: "Энергичные треки для бодрого и успешного начала дня.",
        episodes: 30,
        closed: true
    },
    {
        id: 3,
        title: "Классическая музыка",
        description: "Лучшие произведения классической музыки для полного релакса и вдохновения.",
        episodes: 70,
        closed: false
    },
    {
        id: 4,
        title: "Ретро Хиты",
        description: "Старые добрые хиты 80-х и 90-х, которые всегда в моде.",
        episodes: 50,
        closed: false
    },
    {
        id: 5,
        title: "Подкасты на каждый день",
        description: "Интересные подкасты на разные темы, которые развлекают и вдохновляют.",
        episodes: 100,
        closed: true
    },
];
const likedPodcasts = [
    {
        id: 1,
        title: "Музыка для работы",
        description: "Подборка треков для продуктивной работы и сосредоточения.",
        author: "Кака",
        episodes: 45,
        subscribed: false,
        liked: true
    },
    {
        id: 2,
        title: "Утренний заряд",
        description: "Энергичные треки для бодрого и успешного начала дня.",
        author: "Кика",
        episodes: 30,
        subscribed: false,
        liked: true
    },
    {
        id: 3,
        title: "Классическая музыка",
        description: "Лучшие произведения классической музыки для полного релакса и вдохновения.",
        author: "Кока",
        episodes: 70,
        subscribed: true,
        liked: true

    },
    {
        id: 4,
        title: "Ретро Хиты",
        description: "Старые добрые хиты 80-х и 90-х, которые всегда в моде.",
        author: "Кука",
        episodes: 50,
        subscribed: true,
        liked: true

    },
    {
        id: 5,
        title: "Подкасты на каждый день",
        description: "Интересные подкасты на разные темы, которые развлекают и вдохновляют.",
        author: "Кека",
        episodes: 100,
        subscribed: true,
        liked: true

    },
];

export default function ProfilePage() {
    return (
        <div>
            <HeaderComponent />
            <Container maxWidth="md" sx={profilePageStyles.container}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={ava}
                        alt="Имя Фамилия"
                        sx={profilePageStyles.avatar}
                        variant="rounded"
                    />
                    <Box sx={profilePageStyles.profileBox}>
                        <Typography variant="h4" sx={profilePageStyles.name}>
                            Имя Фамилия
                        </Typography>
                        <Typography variant="h6" sx={profilePageStyles.description}>
                            Описание профиля текст текст текст
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={profilePageStyles.profileLink}>
                            <Link /> vk.com/user
                        </Typography>
                        <Box sx={profilePageStyles.buttonContainer}>
                            <Box sx={profilePageStyles.overlayBox} />
                            <Button variant="contained" sx={profilePageStyles.button}>
                                <Typography sx={profilePageStyles.buttonText}>Изменить профиль</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box sx={profilePageStyles.statsBox}>
                    <Typography variant="body2" sx={profilePageStyles.statText}>27 подписчиков</Typography>
                    <Star sx={profilePageStyles.starIcon} />
                    <Typography variant="body2" sx={profilePageStyles.statText}>256 подписок</Typography>
                    <Star sx={profilePageStyles.starIcon} />
                    <Typography variant="body2" sx={profilePageStyles.statText}>7 подкастов</Typography>
                </Box>

                {ButtonGroup()}
                <FooterComponent />
            </Container>
        </div>
    );
}

function ButtonBeforeCards({line}) {
    return (
        <Box display="flex" justifyContent="center" mb={3}>

            <Button
                variant="contained"
                sx={
                    buttonGroupStyles.createNewButton
                }
            >
                <Typography>{line}</Typography>

            </Button>
            <FooterNavigation/>
        </Box>
    )
}

function renderPlaylistCards(likedStatus) {
    const truncateDescription = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    if (playlists.length === 0) {
        return <Typography variant="h6" sx={{mt: 2}} textAlign="center">У вас пока нету плейлистов</Typography>;
    }

    return playlists.map((item) => {

        const cardRef = useRef(null);
        const [cardSize, setCardSize] = useState({width: 0, height: 0});

        // Получение размеров Card после рендеринга
        useEffect(() => {
            if (cardRef.current) {
                const {width, height} = cardRef.current.getBoundingClientRect();
                setCardSize({width, height});
            }
        }, []);

        return (
            <Box>
                <Box position="relative" mb={2} key={item.id}>
                    <Card ref={cardRef} sx={{position: 'relative', zIndex: 1, mb: 2, borderRadius: "4vh"}}>
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                             p={0}>
                            <CardContent>
                                <Box sx={{flexDirection: 'column', height: {xs: 150, sm: 180, md: 200}}} display="flex"
                                     justifyContent="space-between">
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: {xs: '1rem', sm: '1.2rem', md: '1.5rem'},
                                                lineHeight: 1.2,
                                                height: {xs: '40px', sm: '65px', md: '70px'} // Устанавливает межстрочный интервал
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
                                                height: {xs: '30px', sm: '45px', md: '50px'},
                                                borderRadius: "4vh",
                                                bgcolor: "#173e47"
                                            }}
                                        >
                                            <Typography sx={{
                                                fontSize: {
                                                    xs: '0.6rem',
                                                    sm: '0.8rem',
                                                    md: '1rem'
                                                }
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
                                        borderRadius: "4vh",
                                    }}
                                    image={playlistImage} // Замените на фактический путь к изображению
                                    alt="Плейлист обложка"
                                />
                                <IconButton>
                                    {likedStatus === 'yes' ? <FavoriteIcon/> : <LockIcon/>}
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
            </Box>
        )
            ;
    });
}

function PlaylistCard({item}) {
    const cardRef = useRef(null);
    const [cardSize, setCardSize] = useState({width: 0, height: 0});
    const [isClosed, setClosed] = useState(item.closed);

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

    const handleCloseButtonClick = () => {
        setClosed((prevClosed) => !prevClosed);
    };

    return (
        <Box sx={playlistCardStyles.rootBox} key={item.id}>
            <Card ref={cardRef} sx={playlistCardStyles.card}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={0}>
                    <CardContent>
                        <Box sx={playlistCardStyles.cardContentBox}>
                            <Box>
                                <Typography variant="h6" sx={playlistCardStyles.titleTypography}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={playlistCardStyles.descriptionTypography}>
                                    {truncateDescription(item.description, 4)}
                                </Typography>
                                <Typography variant="body2" sx={playlistCardStyles.episodesTypography}>
                                    {item.episodes} выпуска
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Button variant="contained" sx={playlistCardStyles.listenButton}>
                                    <Typography sx={playlistCardStyles.listenButtonText}>Слушать</Typography>
                                </Button>
                                <IconButton>
                                    <ShareIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="start">
                        <CardMedia
                            component="img"
                            sx={playlistCardStyles.media}
                            image={playlistImage} // Замените на фактический путь к изображению
                            alt="Плейлист обложка"
                        />
                        <IconButton onClick={handleCloseButtonClick}>
                            {isClosed ? <LockIcon/> : <LockOpenRoundedIcon/>}
                        </IconButton>
                    </Box>
                </Box>
            </Card>
            <Box sx={playlistCardStyles.overlay(cardSize.width, cardSize.height)}/>
        </Box>
    );
}

function RenderPlaylistCards({list, noButton}) {
    if (playlists.length === 0) {
        return (
            <Typography variant="h6" sx={{mt: 2}} textAlign="center">
                У вас пока нет плейлистов
            </Typography>
        );
    }


    return (
        <>
            {noButton !== true ? <ButtonBeforeCards line="Новый плейлист"/> : null}

            {/* Рендер карточек плейлистов по циклу */}
            {list.map((item) => (
                <PlaylistCard key={item.id} item={item}/>
            ))}
        </>
    );
}


function renderPodcastCards(likedStatus) {
    const truncateDescription = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    if (podcasts.length === 0) {
        return <Typography variant="h6" sx={{mt: 2}} textAlign="center">У вас пока нету подкастов</Typography>;
    }

    return podcasts.map((item) => {
        const cardRef = useRef(null);
        const [cardSize, setCardSize] = useState({width: 0, height: 0});

        // Получение размеров Card после рендеринга
        useEffect(() => {
            if (cardRef.current) {
                const {width, height} = cardRef.current.getBoundingClientRect();
                setCardSize({width, height});
            }
        }, []);

        return (
            <Box position="relative" mb={2} key={item.id}>
                <Card ref={cardRef} sx={{position: 'relative', zIndex: 1, mb: 2, borderRadius: "4vh"}}>
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
                                            height: {xs: '40px', sm: '65px', md: '70px'} // Устанавливает межстрочный интервал
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
                                    <Button
                                        variant="contained"
                                        sx={{
                                            width: {xs: '80px', sm: '100px', md: '150px'},
                                            height: {xs: '40px', sm: '45px', md: '50px'},
                                            borderRadius: "4vh",
                                            bgcolor: "#173e47"
                                        }}
                                    >
                                        <Typography sx={{
                                            fontSize: {
                                                xs: '0.6rem',
                                                sm: '0.8rem',
                                                md: '1rem'
                                            }
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
                                    borderRadius: "4vh",
                                }}
                                image={playlistImage} // Замените на фактический путь к изображению
                                alt="Плейлист обложка"
                            />
                            <IconButton>
                                {likedStatus === 'yes' ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
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
    });
}


function PodcastCard({item}) {
    const styles = podcastCardStyles; // Используем объект стилей
    const cardRef = useRef(null);
    const [cardSize, setCardSize] = useState({width: 0, height: 0});
    const [isSubscribed, setIsSubscribed] = useState(item.subscribed);
    const [isLiked, setLiked] = useState(item.liked);

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
        setLiked((prevLiked) => !prevLiked);
    };

    return (
        <Box position="relative" mb={2} key={item.id}>
            <Card ref={cardRef} sx={podcastCardStyles.card}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={0}>
                    <CardContent>
                        <Box sx={podcastCardStyles.cardContentBox}>
                            <Box>
                                <Typography variant="h6" sx={podcastCardStyles.title}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={podcastCardStyles.description}>
                                    {truncateDescription(item.description, 2)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={podcastCardStyles.additionalInfo}>
                                    {item.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={podcastCardStyles.additionalInfo}>
                                    {item.episodes} выпуска
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Button variant="contained" sx={podcastCardStyles.button}>
                                    <Typography sx={podcastCardStyles.buttonText}>Слушать</Typography>
                                </Button>
                                <IconButton>
                                    <ShareIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="start" sx={styles.additionalInfo}>
                        <CardMedia
                            component="img"
                            sx={styles.cardMedia}
                            image={playlistImage} // Динамическое изображение
                            alt="Плейлист обложка"
                        />
                        <IconButton onClick={handleLikeButtonClick}>
                            {isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                        </IconButton>
                    </Box>
                </Box>
            </Card>
            <Box
                sx={{
                    ...styles.overlay,
                    width: cardSize.width,
                    height: cardSize.height,
                }}
            />
        </Box>
    );
}


// Основной компонент для рендеринга всех подкастов
function RenderPodcastCards({list, noButton}) {
    if (podcasts.length === 0) {
        return <Typography variant="h6" sx={{mt: 2}} textAlign="center">У вас пока нету подкастов</Typography>;
    }

    return (
        <>
            {noButton !== true ? <ButtonBeforeCards line="Новый подкаст"/> : null}

            {list.map((item) => (
                <PodcastCard key={item.id} item={item}/>
            ))}
        </>
    );
}


function ButtonGroup() {
    const [activeButton, setActiveButton] = useState('подкасты');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const renderContent = () => {
        switch (activeButton) {
            case 'подкасты':
                return <RenderPodcastCards list={podcasts} noButton={false}/>;
            case 'плейлист':
                return <RenderPlaylistCards list={playlists} noButton={false}/>;
            case 'избранное':
                return <UnderlinedButtons/>;
            case 'закладки':
                return <RenderPodcastCards list={podcasts} noButton={true}/>;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={2} width="100%">
                {/* Кнопка подкасты */}
                <Box sx={buttonGroupStyles.buttonBox}>
                    <Box sx={buttonGroupStyles.box(activeButton, 'подкасты')}/>
                    <Button
                        variant="contained"
                        sx={buttonGroupStyles.button(activeButton, 'подкасты')}
                        onClick={() => handleButtonClick('подкасты')}
                    >
                        <Typography sx={buttonGroupStyles.typography}>подкасты</Typography>
                    </Button>
                </Box>

                {/* Кнопка плейлист */}
                <Box sx={buttonGroupStyles.buttonBox}>
                    <Box sx={buttonGroupStyles.box(activeButton, 'плейлист')}/>
                    <Button
                        variant="contained"
                        sx={buttonGroupStyles.button(activeButton, 'плейлист')}
                        onClick={() => handleButtonClick('плейлист')}
                    >
                        <Typography sx={buttonGroupStyles.typography}>плейлист</Typography>
                    </Button>
                </Box>

                {/* Иконка Favorite */}
                <Box sx={buttonGroupStyles.buttonBox}>
                    <Box sx={buttonGroupStyles.boxIcon(activeButton, 'избранное')}/>
                    <IconButton
                        sx={buttonGroupStyles.iconButton(activeButton, 'избранное')}
                        onClick={() => handleButtonClick('избранное')}
                    >
                        <FavoriteBorderIcon sx={buttonGroupStyles.icon}/>
                    </IconButton>
                </Box>

                {/* Иконка Bookmark */}
                <Box sx={buttonGroupStyles.buttonBox}>
                    <Box sx={buttonGroupStyles.boxIcon(activeButton, 'закладки')}/>
                    <IconButton
                        sx={buttonGroupStyles.iconButton(activeButton, 'закладки')}
                        onClick={() => handleButtonClick('закладки')}
                    >
                        <BookmarkBorderIcon sx={buttonGroupStyles.icon}/>
                    </IconButton>
                </Box>
            </Box>
            {renderContent()}
        </Box>
    );
}

function renderWholePart(buttonText, func) {
    if (buttonText === "избранное") {
        return <UnderlinedButtons/>;
    }
    if (!buttonText) {
        return (
            <Box>
                {func}
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="center" mb={3}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#173e47',
                        width: {xs: "100%", sm: "80%", md: "70%"},
                        borderRadius: "4vh"
                    }}
                >
                    {buttonText}
                </Button>
            </Box>
            {func}
        </Box>
    );
}


function UnderlinedButtons() {
    const [activeButton, setActiveButton] = useState('button1'); // По умолчанию выбрана первая кнопка

    const renderContentFavor = () => {
        switch (activeButton) {
            case 'button2':
                return <RenderPlaylistCards list={playlists} noButton={true}/>;
            case 'button1':
                return <RenderPodcastCards list={likedPodcasts} noButton={true}/>;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Box sx={underlineButtonStyles.container}>
                <Button
                    sx={underlineButtonStyles.button(activeButton, 'button1')}
                    onClick={() => setActiveButton('button1')}
                >
                    Подкасты
                </Button>
                <Button
                    sx={underlineButtonStyles.button(activeButton, 'button2')}
                    onClick={() => setActiveButton('button2')}
                >
                    Плейлисты
                </Button>
            </Box>
            {renderContentFavor()}
        </Box>
    );
}


