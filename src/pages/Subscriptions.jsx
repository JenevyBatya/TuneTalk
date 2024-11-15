import {Box, Typography} from "@mui/material";
import CustomCard from "../components/CustomCard";
import cardPhoto from '../assets/cardPhoto.svg';
import React, {useState} from "react";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

const Subscriptions = () => {
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
            <HeaderComponent/>
            <table className="chapterName" style={{marginLeft: '1.5vh'}}>
                <tbody>
                <tr>
                    <th>
                        <Typography variant="h3" component="div" style={{fontWeight: 'bold', marginRight: 4}}>
                            Subscriptions
                        </Typography>
                    </th>
                </tr>
                <tr>
                    <th style={{ position: 'relative' }}>
                        <Typography style={{color: "#6D6D6D", marginTop: 3, paddingLeft: '0ch', marginLeft: 0,
                            position: 'absolute', // Абсолютное позиционирование
                            left: '22.9%',
                        }}>—  [səbˈskrɪpʃ(ə)ns] (en.) подписки</Typography>
                    </th>
                    </tr>
                </tbody>
            </table>
            <Box style={{marginTop: 30}}>
                <CategoryFilter
                    onFilter={handleFilterData}
                />
            </Box>
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
            <FooterNavigation/>
        </div>

    );
};
export default Subscriptions;