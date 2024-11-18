const profilePageStyles = {
    container: {
        bgcolor: '#ffffff',
        pt: 3,
        pl: 0,
    },
    avatar: {
        width: { xs: 140, sm: 150, md: 200 },
        height: { xs: 140, sm: 150, md: 200 },
        mr: "5vw",
        borderRadius: "4vh",
    },
    profileBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: { xs: 140, sm: 160, md: 200 },
        justifyContent: 'space-between',
    },
    name: {
        fontSize: { xs: '1.3rem', sm: '2rem', md: '2.5rem' },
    },
    description: {
        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
        lineHeight: 1,
    },
    profileLink: {
        fontSize: { xs: '0.9rem', sm: '0.9rem' },
        display: 'flex',
        gap: 1,
    },
    buttonContainer: {
        position: 'relative',
        height: { xs: '30px', sm: '35px', md: '40px' },

    },
    overlayBox: {
        position: 'absolute',
        width: { xs: '140px', sm: '140px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        bgcolor: 'black',
        zIndex: 0,
    },
    button: {
        width: { xs: '140px', sm: '140px', md: '150px' },
        height: { xs: '30px', sm: '35px', md: '40px' },
        zIndex: 1,
        bgcolor: 'white',
        borderRadius: "2vh",
        boxShadow: "none",

    },
    buttonText: {
        fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' },
        color: "black",
    },
    statsBox: {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
        fontSize: { xs: '0.4rem', sm: '0.9rem' },
    },
    statText: {
        fontSize: { xs: '0.8rem', sm: '0.9rem' },
    },
    starIcon:{
        width: 15, height: 15, color: '#cbcbcb'
    }
};

export default profilePageStyles