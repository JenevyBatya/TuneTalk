import React, { useState } from 'react';
import {
    FormControlLabel,
    Typography,
    Radio,
    RadioGroup, Box, Chip, IconButton
} from '@mui/material';
import axios from 'axios';
import DurationSlider from "./DurationSlider";
import {styled} from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import filterIcon from "../assets/icons/filterIcon.svg";
import {StyledButton} from "./CustomCard";



const CustomRadio = styled(Radio)({
    color: '#173E47',
    '&.Mui-checked': {
        color: '#FF6B00',
        fontSize: '1rem'
    },
    '& .MuiSvgIcon-root': {
        fontSize: '1rem',
    },
});
const CategoryChip = styled(Chip)(({ theme, selected }) => ({
    backgroundColor: selected ? '#D4FF00' : '#E5E5E5',
    color: '#000',
    borderRadius: '10px',
    padding: '0 6px',
    fontSize: '1rem',
    '& .MuiChip-label': {
        display: 'flex',
        alignItems: 'center',
    },
    '&:hover': {
        backgroundColor: selected ? '#C0E800' : '#E5E5E5',
    }
}));
const categories = [
    'Криминал', 'Секс', 'Дизайн', 'Образование', 'Драма', 'Воспитание',
    'Культура', 'Наука', 'Спорт', 'История', 'Медицина', 'Политика',
    'Финансы', 'Технологии', 'Музыка', 'Путешествия', 'Природа', 'Психология',
    'Религия', 'Кино'
];


const CategoryFilter = ({onFilter}) => {
    const [duration, setDuration] = useState([15, 40]); // Пример диапазона
    const [sortOrder, setSortOrder] = useState('date'); // Значения: 'date', 'duration', 'relevance'
    const [selectedCategories, setSelectedCategories] = useState(['Образование', 'Воспитание']);
    const [showFilters, setShowFilters] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);


    // Обновление диапазона времени
    const handleDurationChange = (event, newValue) => {
        setDuration(newValue);
    };

    // Обновление выбранной сортировки
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Обработка выбора категорий
    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((cat) => cat !== category)
                : [...prevCategories, category]
        );
    };

    //TODO Отправка запроса на бэк
    const applyFilters = async () => {
        try {
            const response = await axios.post('/api/filter', {
                duration,
                sortOrder,
                categories: selectedCategories
            });
            onFilter(response.data); // Обновляем данные на основе ответа
        } catch (error) {
            console.error('Ошибка при фильтрации данных:', error);
        }
    };
    const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
                <IconButton onClick={() => setShowFilters(!showFilters)} color="gray" sx={{marginRight: 1.5}}>
                    <img src={filterIcon} alt="search icon" width="27" height="27"/>
                </IconButton>
            </Box>

            {showFilters && (
                <Box>
                    <Typography variant="h5" sx={{ padding: '1rem' }}>Фильтрация</Typography>
            {/* Фильтрация по длительности */}
            <div>
                <DurationSlider value={duration} onChange={handleDurationChange} />
            </div>

            {/* Фильтрация по сортировке */}
            <Box sx={{ padding: '1rem' }}>
                <Typography variant="h6">Упорядочить</Typography>
                <RadioGroup value={sortOrder} onChange={handleSortChange}>
                    <FormControlLabel
                        value="date"
                        control={<CustomRadio />}
                        label="По дате загрузки"
                    />
                    <FormControlLabel
                        value="duration"
                        control={<CustomRadio />}
                        label="По продолжительности"
                    />
                    <FormControlLabel
                        value="relevance"
                        control={<CustomRadio />}
                        label="По релевантности"
                    />
                </RadioGroup>
            </Box>

            {/* Фильтрация по категориям */}
            <div>
                <Typography variant="h6" sx={{paddingLeft:'1rem'}}>Категории</Typography>
                <Box padding = '1rem'
                    display="flex"
                    flexWrap="wrap" gap={1}
                    justifyContent="flex-start"
                    maxWidth="300px" //TODO change the size
                >
                    {displayedCategories.map((category) => (
                        <CategoryChip
                            key={category}
                            label={
                                <>
                                    {category}
                                    {selectedCategories.includes(category) && (
                                        <CheckIcon style={{ marginLeft: 4, fontSize: '1.2rem' }} />
                                    )}
                                </>

                        }
                            selected={selectedCategories.includes(category)}
                            onClick={() => handleCategoryChange(category)}
                            clickable
                        />
                    ))}
                    {/* Кнопка для показа всех категорий */}
                        <CategoryChip
                            label="..."
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            clickable
                            style={{ backgroundColor: '#E5E5E5', color: '#000' }}
                        />
                </Box>
            </div>
            {/* Кнопка для применения фильтров */}
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom='4vh'>
            <StyledButton onClick={applyFilters} variant="contained" color="primary">
                Применить фильтры
            </StyledButton>
            </Box>
            </Box>

            )}
        </div>
    );
};

export default CategoryFilter;
