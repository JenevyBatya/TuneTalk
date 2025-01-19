import React from 'react';
import {Card, CardContent, Typography, Button, Chip, Avatar, Box} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from "react-router-dom";

export const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#173E47',
    color: '#fff',
    borderRadius: '10px',
    marginTop: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#173E47',
    },
}));
const GreenSquare = styled(Box)(({theme}) => ({
    marginTop: '5%',
    backgroundColor: '#C0EF00',
    width: '90%',
    display: 'flex',
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center'
}));

const TagChip = styled(Chip)(({theme}) => ({
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FF6600',
}));
const CustomCard = ({id, name, description, tags = [], duration, author, subscribers, cardPhoto, type}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        const route = type === "audio" ? `/Audio-podcast/${id}` : `/Video-podcast/${id}`;
        navigate(route);
    };

    return (
        <GreenSquare>
            <Card
                sx={{
                    border: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    borderRadius: '4vh',
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{flex: 1, textAlign: 'left'}}>
                    <div>
                        <Typography variant="h6" component="div" style={{fontWeight: 'bold'}}>
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Box sx={{display: 'flex', marginTop: 0}}>
                            {tags.map((tag, index) => (
                                <TagChip key={index} label={'#' + tag.text} />
                            ))}
                        </Box>
                        <Typography sx={{marginTop: 0}} variant="body2" color="text.secondary">
                            {duration}
                        </Typography>
                    </div>
                    <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 1}}>
                        <Box sx={{display: 'flex', marginBottom: 0}}>
                            <Avatar sx={{bgcolor: '#757575'}}></Avatar>
                            <Box sx={{marginLeft: 1}}>
                                <Typography variant="body2" color="text.primary">
                                    {author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {subscribers} подписчиков
                                </Typography>
                            </Box>
                        </Box>
                        <StyledButton
                            variant="contained"
                            sx={{marginLeft: 2, width: '62%'}}
                            onClick={handleNavigate}
                        >
                            {type === "audio" ? "Слушать" : "Смотреть"}
                        </StyledButton>
                    </Box>
                </CardContent>
                <Box
                    sx={{
                        flex: 1,
                        margin: '1.5vh',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '5px',
                    }}
                >
                    <img
                        src={cardPhoto}
                        alt="Podcast"
                        style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '2vh'}}
                    />
                </Box>
            </Card>
        </GreenSquare>
    );
};


export default CustomCard;