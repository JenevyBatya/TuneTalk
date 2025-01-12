import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import CustomCard from "../components/CustomCard";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import cardPhoto from '../assets/cardPhoto.svg';
import styles from '../styles/Library.module.css';

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
    ];

    const searchFields = ['name', 'description', 'author'];
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterData = (filtered) => {
        setFilteredData(filtered);
    };

    return (
        <div className={styles.mainContainer}>
            <HeaderComponent/>
            <SearchFilter
                data={data}
                searchFields={searchFields}
                onSearch={setFilteredData}
            />
            <table className={styles.chapterName}>
                <tbody>
                <tr>
                    <th>
                        <Typography variant="h4" component="div" className={styles.libraryHeader}>
                            Library
                        </Typography>
                    </th>
                    <th>
                        <Typography className={styles.librarySubheader}>
                            — [ˈlaɪbrərɪ] (en.) библиотека
                        </Typography>
                    </th>
                </tr>
                </tbody>
            </table>
            <CategoryFilter onFilter={handleFilterData}/>
            <div className={styles.cardContainer}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
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
                ) : (
                    <Box className={styles.noData}>
                        <Typography variant="body1" className={styles.noDataText}>
                            Кажется, пока что у нас такого нет...
                        </Typography>
                    </Box>
                )}
            </div>
            <FooterNavigation/>
        </div>
    );
};

export default Library;
