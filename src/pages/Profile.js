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
// import FooterNavigation from "../components/FooterComponent";
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
export const podcasts = [
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
export const playlists = [
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
export const likedPodcasts = [
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

export function ButtonBeforeCards({line}) {
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
            {/*<FooterNavigation/>*/}
        </Box>
    )
}



export function PlaylistCard({item}) {
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
                            {isClosed ? <LockIcon data-testid="lock-icon" /> : <LockOpenRoundedIcon data-testid="lock-open-icon" />}
                        </IconButton>
                    </Box>
                </Box>
            </Card>
            <Box sx={playlistCardStyles.overlay(cardSize.width, cardSize.height)}/>
        </Box>
    );
}

export function RenderPlaylistCards({list, noButton}) {
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





export function PodcastCard({item}) {
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
            <Card ref={cardRef} sx={styles.card}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={0}>
                    <CardContent>
                        <Box sx={styles.cardContentBox}>
                            <Box>
                                <Typography variant="h6" sx={styles.title}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={styles.description}>
                                    {truncateDescription(item.description, 2)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={styles.additionalInfo}>
                                    {item.author}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={styles.additionalInfo}>
                                    {item.episodes} выпуска
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Button variant="contained" sx={styles.button}>
                                    <Typography sx={styles.buttonText}>Слушать</Typography>
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
export function RenderPodcastCards({list, noButton}) {
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


export function ButtonGroup() {
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



export function UnderlinedButtons() {
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


