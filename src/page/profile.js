import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider, Grid,
    IconButton,
    Tab,
    Tabs, Toolbar,
    Typography
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import ava from "../img/ava.jpg";
import Star from '@mui/icons-material/Star';
import Link from '@mui/icons-material/Link';
import playlist from "../img/playlist.jpg";


export default function ProfilePage() {
    return (

        <Container maxWidth="sm" sx={{bgcolor: '#f5f5f5', pt: 4}}>
            {/* Toolbar at the top of the container */}
            <AppBar position="static" sx={{bgcolor: '#adcac8', mb: 5}} elevation={0}>
                <Toolbar sx={{height: 20}}/>
            </AppBar>
            <Box display="flex" alignItems="center" mb={3}>

                <Avatar
                    src={ava}
                    alt="Имя Фамилия"
                    sx={{width: 200, height: 200, mr: 5, borderRadius: 10}}
                    variant="rounded"
                />

                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'start', height: 200,
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h4">Имя Фамилия</Typography>
                    <Typography variant="h6" sx={{lineHeight: 1}}>
                        Описание профиля текст текст текст
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="flex" gap={2}>
                        <Link/>
                        vk.com/user
                    </Typography>
                    <Button size="small" variant="outlined" sx={{mt: 1, width: 150, height: 40}} color="textSecondary">
                        <Typography sx={{fontSize: 10}}>Изменить профиль</Typography>
                    </Button>
                </Box>

            </Box>

            {/* User stats */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2">27 подписчиков</Typography>
                <Star sx={{width: 15, height: 15, color: '#cbcbcb'}}/>
                <Typography variant="body2">256 подписок</Typography>
                <Star sx={{width: 15, height: 15, color: '#cbcbcb'}}/>
                <Typography variant="body2">7 подкастов</Typography>
            </Box>


            {/* Tabs for navigation */}
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={2} width="100%">
                <Tab label="Подкасты"/>
                <Tab label="Плейлисты"/>
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton>
                    <BookmarkBorderIcon/>
                </IconButton>
            </Box>


            {/* New playlist button */}
            <Box display="flex" justifyContent="center" mb={3}>
                <Button variant="contained" sx={{bgcolor: '#173e47', width: "70%", borderRadius: 3}}>
                    Новый плейлист
                </Button>
            </Box>

            {/* Playlist Card */}
            <Card sx={{mb: 2}}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={2}>
                    <CardContent>
                        <Box sx={{flexDirection: 'column', height: 200}} display="flex" justifyContent="space-between">
                            <Box>
                                <Typography variant="h6">Плейлист №1</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Описание / тема
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    233 выпуска
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant="contained" color="secondary">
                                    Слушать
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
                            sx={{width: 200, height: 200, borderRadius: 10}}
                            image={playlist}  // Убедитесь, что переменная playlist определена
                            alt="Плейлист обложка"
                        />
                        <IconButton>
                            <LockIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Card>


            {/* Repeat for another playlist */}
            <Card sx={{mb: 2}}>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p={2}>
                    <CardContent>
                        <Box sx={{flexDirection: 'column', height: 200}} display="flex" justifyContent="space-between">
                            <Box>
                                <Typography variant="h6">Плейлист №1</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Описание / тема
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    233 выпуска
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant="contained" color="secondary">
                                    Слушать
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
                            sx={{width: 200, height: 200, borderRadius: 10}}
                            image={playlist}  // Убедитесь, что переменная playlist определена
                            alt="Плейлист обложка"
                        />
                        <IconButton>
                            <LockIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
}
