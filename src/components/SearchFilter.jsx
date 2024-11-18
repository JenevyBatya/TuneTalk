import React, {useEffect, useState} from 'react';
import {TextField, InputAdornment} from '@mui/material';
import searchIcon from '../assets/icons/searchIcon.svg';

const SearchFilter = ({data = [], searchFields = [], onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Обновляем фильтрованные данные, когда обновляется `data`
        handleSearch(searchQuery);
    }, [data]);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(item =>
            searchFields.some(field =>
                item[field] && item[field].toString().toLowerCase().includes(lowerCaseQuery)
            )
        );

        // Передаем отфильтрованные данные обратно в родительский компонент
        onSearch && onSearch(filtered);
    };


    return (
        <div>
        <table style={{marginTop: '3vh', marginLeft: '4vh'}}>
        <tbody>
        <tr>
            <th>
                <img src={searchIcon} alt="search icon" width="20" height="20"
                     style={{marginBottom: '1vh', marginRight: '1vh'}}/>
            </th>
            <th>
                <TextField
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
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
                            width: '33vh'
                        },
                        classes: {
                            notchedOutline: {
                                border: 'none',
                            }
                        }
                    }}
                    sx={{
                        marginBottom: 2,
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
        </div>
    );
};

export default SearchFilter;
