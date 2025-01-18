import React, {useState} from "react";
import {styled} from "@mui/system";
import {Box, Button} from "@mui/material";

export const StyledButtonForSubscribe = styled(Button)(({}) => ({
    backgroundColor: '#fff',
    color: '#173E47',
    borderRadius: '15px',
    border: 'none', // Ensure no border is present
    outline: 'none', // Remove the outline
    boxShadow: 'none', // Remove any shadow
    '&:hover': {
        backgroundColor: '#fff',
    },
    '&:focus': {
        outline: 'none', // Remove focus outline
    },
}));

const BlueSquare = styled(Box)(({}) => ({
    backgroundColor: '#173E47',
    display: 'flex',
    marginLeft: '11%',
    width: 'fit-content',
    justifyContent: 'center',
    alignItems: 'center',
}));

const SubscribeButton = () => {
    const [subscribed, setSubscribed] = useState(false);

    const handleClick = () => {
        setSubscribed(prevState => !prevState);
    };

    return (
        <BlueSquare>
            <StyledButtonForSubscribe
                sx={{border: 'none', outline: 'none', boxShadow: 'none'}}
                variant="contained"
                onClick={handleClick}
            >
                {subscribed ? "Подписаны" : "Подписаться"}
            </StyledButtonForSubscribe>
        </BlueSquare>
    );
};

export default SubscribeButton;
