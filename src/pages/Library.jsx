import {InputAdornment, TextField, Typography} from "@mui/material";
import CustomCard from "../components/CustomCard";
import cardPhoto from '../assets/cardPhoto.svg';
import searchIcon from "../assets/searchIcon.svg";
import React, {useState} from "react";

const Library = () => {
    const data = [
        {
            id: 1,
            name: "Name",
            description: "Description/Theme",
            tags: [{id: 1, text: "tags"}, {id: 2, text: "tags"}, {id: 3, text: "tags"}],
            duration: "60 min",
            author: "author",
            subscribes: 1,
            photo: cardPhoto
        },
        {
            id: 2,
            name: "Test",
            description: "Description/Theme",
            tags: [{id: 1, text: "tags"}, {id: 2, text: "tags"}, {id: 3, text: "tags"}],
            duration: "60 min",
            author: "author",
            subscribes: 1,
            photo: cardPhoto
        }
    ]
    const searchFields = ['name', 'description', 'author']
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item =>
                searchFields.some(field =>
                    item[field] && item[field].toString().toLowerCase().includes(query)
                )
            );
            setFilteredData(filtered);
        }

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
            <table className="chapterName" style={{marginLeft: '1.5vh'}}>
                <tbody>
                <tr>
                    <th>
                        <Typography variant="h3" component="div" style={{fontWeight: 'bold', marginRight: 4}}>
                            Library
                        </Typography>
                    </th>
                    <th>
                        <Typography style={{color: "#6D6D6D", marginTop: 3}}>— [ˈlaɪbrərɪ] (en.) библиотека</Typography>
                    </th>
                </tr>
                </tbody>
            </table>
            <div style={{marginTop: 70}}>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                    <div key={index} style={{marginTop: 10}}>
                        <CustomCard
                            name={item.name}
                            description={item.description}
                            tags={item.tags}
                            duration={item.duration}
                            author={item.author}
                            subscribers={item.subscribes}
                            cardPhoto={item.photo}
                        />
                    </div>
                ))
                ):(
                    <Typography>Кажется, пока что у нас такого нет...</Typography>
                )}
            </div>
        </div>

    );
};
export default Library;