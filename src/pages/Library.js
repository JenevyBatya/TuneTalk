import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import CustomCard, {StyledButton} from "../components/CustomCard";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import '../styles/Library.css';
import axios from "axios";

export const Library = () => {
    const [data, setData] = useState([]);
    const searchFields = ['title', 'description', 'authorEmail'];
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    const fetchData = async (page) => {
        try {
            const limit = 10;
            const response = await axios.get(`https://small-duck.ru/api/library/list?page=${page}&limit=${limit}`);
            const {data, total} = response.data;

            const updatedData = await Promise.all(
                data.map(async (item) => {
                    const coverResponse = await axios.get(`https://small-duck.ru/api/library/cover/${item.id}`, {
                        responseType: "blob",
                    });
                    const coverURL = URL.createObjectURL(coverResponse.data);
                    return {...item, coverURL};
                })
            );

            const hasMoreData = page * limit < total;
            return {data: updatedData, hasMore: hasMoreData};
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            return {data: [], hasMore: false};
        }
    };

    const loadCoverImagesForPodcasts = async (podcasts) => {
        try {
            const updatedPodcasts = await Promise.all(
                podcasts.map(async (podcast) => {
                    const coverResponse = await axios.get(`https://small-duck.ru/api/library/cover/${podcast.id}`, {
                        responseType: 'blob',
                    });
                    const coverURL = URL.createObjectURL(coverResponse.data);
                    return {...podcast, coverURL};
                })
            );

            return updatedPodcasts;

        } catch (error) {
            console.error('Ошибка при загрузке обложек:', error);
            return podcasts;
        }
    };

    const loadMoreData = async () => {
        try {
            const {data: newData, hasMore: newHasMore} = await fetchData(page);
            if (newData && newData.length > 0) {
                setData((prev) => [...prev, ...newData]);
                setFilteredData((prev) => [...prev, ...newData]);
                setPage((prev) => prev + 1);
                setHasMore(newHasMore);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        if (hasMore) {
            loadMoreData();
        }
    }, []);

    const handleFilterData = async (filtered) => {
        const updatedFilteredData = await loadCoverImagesForPodcasts(filtered);
        setFilteredData(updatedFilteredData);

    };

    return (
        <div>
            <HeaderComponent/>
            <div>
                <SearchFilter
                    data={data}
                    searchFields={searchFields}
                    onSearch={setFilteredData}
                />
                <table className="chapterName">
                    <tbody>
                    <tr>
                        <th>
                            <Typography variant="h4" component="div" className="libraryHeader">
                                Library
                            </Typography>
                        </th>
                        <th>
                            <Typography className="librarySubheader">
                                — [ˈlaɪbrərɪ] (en.) библиотека
                            </Typography>
                        </th>
                    </tr>
                    </tbody>
                </table>
                <CategoryFilter onFilter={handleFilterData}/>
                <div className="cardContainer">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.id} className="cardWrapper">
                                <CustomCard
                                    // key={index}
                                    id={item.id} //Это тоже новое
                                    name={item.title}
                                    description={item.description}
                                    tags={item.categories.map((tag) => ({id: tag, text: tag}))}
                                    duration={item.duration}
                                    author={item.username}
                                    subscribers={Math.floor(Math.random() * 100)} // Заглушка для подписчиков
                                    cardPhoto={item.coverURL}
                                    type={item.type} //Тип теперь есть везде, так что нужно менять бэк
                                />
                            </div>
                        ))
                    ) : (
                        <Box className="noData">
                            <Typography variant="body1" className="noDataText">
                                Кажется, пока что у нас такого нет...
                            </Typography>
                        </Box>
                    )}
                    {hasMore && (
                        <div style={{marginBottom: '100px'}}>
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