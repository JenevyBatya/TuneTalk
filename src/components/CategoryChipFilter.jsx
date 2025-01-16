import {Box, Chip, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, {useState} from "react";
import {styled} from "@mui/system";
const CategoryChip = styled(Chip)(({ theme, selected }) => ({
    backgroundColor: selected ? '#C0EF00' : '#E5E5E5',
    color: '#000',
    borderRadius: '10px',
    padding: '0 6px',
    fontSize: '1rem',
    '& .MuiChip-label': {
        display: 'flex',
        alignItems: 'center',
    },
    '&:hover': {
        backgroundColor: selected ? '#C0EF00' : '#E5E5E5',
    }
}));

const categories = [
    'Криминал', 'Секс', 'Дизайн', 'Образование', 'Драма', 'Воспитание',
    'Культура', 'Наука', 'Спорт', 'История', 'Медицина', 'Политика',
    'Финансы', 'Технологии', 'Музыка', 'Путешествия', 'Природа', 'Психология',
    'Религия', 'Кино'
];
const CategoryChipFilter = ({selectedCategories, setSelectedCategories, containerStyle}) => {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);
    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((cat) => cat !== category)
                : [...prevCategories, category]
        );
    };
    return(
        <div>
        <Typography variant="h6" sx={{paddingLeft:'1rem'}}>Категории</Typography>
    <Box padding = '1rem'
         display="flex"
         flexWrap="wrap" gap={1}
         justifyContent="flex-start"
         maxWidth="300px"
         {...containerStyle}
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
    )
}
export default CategoryChipFilter;
