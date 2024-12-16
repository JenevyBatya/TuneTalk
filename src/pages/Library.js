import React, {useEffect, useState} from "react";
import { Box, Typography } from "@mui/material";
import CustomCard, {StyledButton} from "../components/CustomCard";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import cardPhoto from '../assets/cardPhoto.svg';
import styles from '../styles/Library.module.css';

const Library = () => {
    const [data, setData] = useState([]);
    const searchFields = ['name', 'description', 'author'];
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    // Mock server request, TODO server request
    const fetchData = async (page) => {
        const limit = 10;
        const start = (page - 1) * limit;
        const serverData = Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `Name ${i + 1}`,
            description: "Description/Theme",
            tags: [{ id: 1, text: "tags" }, { id: 2, text: "tags" }, { id: 3, text: "tags" }],
            duration: "60 min",
            author: `Author ${i + 1}`,
            subscribes: 1,
            photo: cardPhoto
        }));
        const result = serverData.slice(start, start + limit);
        return result.length > 0 ? result : null;
    };
    const loadMoreData = async () => {
        const newData = await fetchData(page);
        if (newData) {
            setData((prev) => [...prev, ...newData]);
            setFilteredData((prev) => [...prev, ...newData]);
            setPage((prev) => prev + 1);
        } else {
            setHasMore(false);
        }
    };
    useEffect(() => {
        loadMoreData();
    }, []);



    const handleFilterData = (filtered) => {
        setFilteredData(filtered);
    };

    return (
        <div>
            <HeaderComponent />
            <div>
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
            <CategoryFilter onFilter={handleFilterData} />
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
                {hasMore && (
                    <div style={{marginBottom:'100px'}}>
                        <Box textAlign="center" marginY={2}>
                            <StyledButton variant="contained" onClick={loadMoreData}>
                                Загрузить ещё
                            </StyledButton>
                        </Box>
                    </div>
                )}
            </div>
            </div>
            <FooterNavigation/>
        </div>
    );
};

export default Library;
