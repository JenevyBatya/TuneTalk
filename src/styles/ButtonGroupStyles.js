const buttonGroupStyles = {
    button: (activeButton, button) => ({
        width: { xs: '90px', sm: '100px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        zIndex: 1,
        bgcolor: activeButton === button ? '#fd7510' : '#ffffff',
        color: 'black',
        borderRadius: '2vh',
        boxShadow: "none",

    }),
    iconButton: (activeButton, button) => ({
        width: { xs: '35px', sm: '100px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        zIndex: 1,
        bgcolor: activeButton === button ? '#fd7510' : '#ffffff',
        color: 'black',
        borderRadius: '2vh',
        '&:hover': {
            bgcolor: activeButton === button ? '#fd7510' : '#ffffff',
            color: 'black',
        },
    }),
    box: (activeButton, button) => ({
        position: 'absolute',
        width: { xs: '90px', sm: '100px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        bgcolor: '#fd7510',
        opacity: activeButton === button ? 0 : 1,
        zIndex: 0,
        boxShadow: "none",

    }),
    boxIcon: (activeButton, button) => ({
        position: 'absolute',
        width: { xs: '35px', sm: '100px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        bgcolor: '#fd7510',
        opacity: activeButton === button ? 0 : 1,
        zIndex: 0,
        boxShadow: "none",
    }),
    typography: {
        fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' },
    },
    icon: {
        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
    },
    createNewButton: {
        bgcolor: '#173e47',
        width: {xs: "100%", sm: "80%", md: "70%"},
        borderRadius: "2vh",
        boxShadow: "none",

    },
    buttonBox:{
        position: 'relative',
        height: { xs: '30px', sm: '35px', md: '40px'},
        boxShadow: "none",


    }
};
export default buttonGroupStyles
