 const underlineButtonStyles = {
    button: (activeButton, button) => ({
        color: 'black',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '10px 20px',
        borderBottom: activeButton === button ? '2px solid #fd7510' : 'none',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    }),
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
    },
};

export default underlineButtonStyles