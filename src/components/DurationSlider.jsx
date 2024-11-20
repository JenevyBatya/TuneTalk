import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomSlider = styled(Slider)({
    color: '#C0EF00',
    height: 2,
    padding: '13px 0',

    '& .MuiSlider-thumb': {
        height: 12,
        width: 12,
        backgroundColor: '#C0EF00',
        // border: '2px solid #a8cf45',
        '&:hover, &.Mui-focusVisible, &.Mui-active': {
            boxShadow: '0px 0px 0px 8px rgba(168, 207, 69, 0.16)',
        },
    },

    '& .MuiSlider-rail': {
        color: '#173E47',
        opacity: 1,
        height: 2.5,
    },
});

const marks = [
    { value: 15, label: '15 мин.' },
    { value: 40, label: '40 мин.' },
];

const DurationSlider = ({ value, onChange }) => {
    return (
        <Box sx={{ width: 300, padding: '0 1rem' }}>
            <Typography gutterBottom variant='h6'>Продолжительность</Typography>
            <CustomSlider
                value={value}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={5}
                max={60}
                marks={marks}
            />
        </Box>
    );
};

export default DurationSlider;
