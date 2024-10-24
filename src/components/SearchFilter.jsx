import React, {useEffect, useState} from 'react';
import {TextField, InputAdornment, Typography} from '@mui/material';
import searchIcon from '../assets/searchIcon.svg';
import {Grid} from "@mui/system";

const SearchFilter = ({data = [], searchFields = [], renderItem}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);


    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = data.filter(item =>
            searchFields.some(field =>
                item[field] && item[field].toString().toLowerCase().includes(query) // Добавлена проверка на наличие поля
            )
        );
        setFilteredData(filtered);
    };


    return (
        <div>
        <table>
            <tbody>
            <tr>
                <th>
                    <img src={searchIcon} alt="search icon" width="20" height="20" style={{marginBottom: '1vh', marginRight: '1vh'}}/>
                </th>
                <th>
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearch}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>
                            ),
                            style: {
                                backgroundColor: '#D9D9D9',
                                borderRadius: '1vh',
                                height: 40,
                            },
                            classes: {
                                notchedOutline: {
                                    border: 'none',
                                }
                            }
                        }}
                        sx={{marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                </th>
            </tr>
            </tbody>
        </table>
    {/* Отображение данных (карточки или другой формат) */}
    <Grid container spacing={2}>
        {filteredData.length > 0 ? (
            filteredData.map(item => (
                <Grid item key={item.id}>
                    {renderItem(item)}
                </Grid>
            ))
        ) : (
            searchQuery ? (
                <Typography>Кажется, пока что у нас такого нет...</Typography>
            ) : null
        )}
    </Grid>
        </div>
    );
};

export default SearchFilter;
