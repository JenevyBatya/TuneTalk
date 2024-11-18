const podcastCardStyles = {
    card: {
        position: 'relative',
        zIndex: 1,
        mb: 2,
        borderRadius: "4vh",
        boxShadow: "none",

    },
    cardContentBox: {
        flexDirection: 'column',
        height: { xs: 150, sm: 180, md: 200 },
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
        lineHeight: 1.2,
        height: { xs: '40px', sm: '65px', md: '70px' },
    },
    description: {
        fontSize: { xs: '0.7rem', sm: '0.8rem' },
        height: { xs: '40px', sm: '65px', md: '70px' },
        lineHeight: 1.2,
    },
    additionalInfo: {
        fontSize: { xs: '0.7rem', sm: '0.8rem' },
    },
    button: {
        width: { xs: '80px', sm: '100px', md: '150px' },
        height: { xs: '40px', sm: '45px', md: '50px' },
        borderRadius: "10px",
        bgcolor: "#173e47",
    },
    buttonText: {
        fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' },
    },
    cardMedia: {
        width: { xs: 120, sm: 150, md: 200 },
        height: { xs: 140, sm: 150, md: 200 },
        borderRadius: "4vh",
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgb(191,238,1)',
        zIndex: 0,
    },
};

export default podcastCardStyles;
