import {Box, Typography} from "@mui/material";
import CustomCard from "../components/CustomCard";
import cardPhoto from '../assets/cardPhoto.svg';
import React, {useState} from "react";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";

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
    const searchFields = ['name', 'description', 'author'];
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterData = (filtered) => {
        setFilteredData(filtered);
    };
    return (
        <div>
            <SearchFilter
                data={data}
                searchFields={searchFields} // Поля, по которым будет производиться поиск
                onSearch={(filtered) => setFilteredData(filtered)} // Обработка результатов поиска
            />
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
            <CategoryFilter
                onFilter={handleFilterData}  // Передаем функцию для фильтрации данных
            />
            <div style={{marginTop: 15}}>
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
                    <Box sx={{textAlign:'center'}}>
                    <Typography variant="h8" component="div" style={{fontWeight: 'bold'}}>
                        Кажется, пока что у нас такого нет...
                    </Typography>
                    </Box>
                )}
            </div>
        </div>

    );
};
export default Library;