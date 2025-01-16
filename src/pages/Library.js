
import React, {useEffect, useState} from "react";
import { Box, Typography } from "@mui/material";
import CustomCard, {StyledButton} from "../components/CustomCard";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../styles/Library.module.css";
import axios from "axios";

export const Library = () => {
    const [data, setData] = useState([]);
    const searchFields = ['title', 'description', 'authorEmail'];
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Функция для загрузки данных с сервера
    const fetchData = async (page) => {
        try {
            const limit = 10;
            const response = await axios.get(`http://localhost:80/library/list?page=${page}&limit=${limit}`);
            const { data, total } = response.data;
    
            // Преобразование данных: загрузка обложек
            const updatedData = await Promise.all(
                data.map(async (item) => {
                    const coverResponse = await axios.get(`http://localhost:80/library/cover/${item.id}`, {
                        responseType: "blob",
                    });
                    const coverURL = URL.createObjectURL(coverResponse.data);
                    return { ...item, coverURL };
                })
            );
    
            const hasMoreData = page * limit < total;
            return { data: updatedData, hasMore: hasMoreData };
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            return { data: [], hasMore: false };
        }
    };

    const loadMoreData = async () => {
        try {
            const { data: newData, hasMore: newHasMore } = await fetchData(page);
            if (newData && newData.length > 0) {
                setData((prev) => [...prev, ...newData]);
                setFilteredData((prev) => [...prev, ...newData]);
                setPage((prev) => prev + 1);
                setHasMore(newHasMore); // Убедитесь, что переменная обновляется корректно
            } else {
                setHasMore(false); // Если данных больше нет, явно указываем false
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            setHasMore(false); // В случае ошибки больше данных не загружаем
        }
    };
    
    useEffect(() => {
        // Проверка, чтобы не загружать данные, если hasMore = false
        if (hasMore) {
            loadMoreData();
        }
    }, []);

    // Фильтрация данных
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
                                    name={item.title}
                                    description={item.description}
                                    tags={item.categories.map((tag) => ({ id: tag, text: tag }))}
                                    duration={item.duration}
                                    author={item.username}
                                    subscribers={Math.floor(Math.random() * 100)} // Заглушка для подписчиков
                                    cardPhoto={item.coverURL} 
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
                        <Box textAlign="center" marginY={2}>
                            <StyledButton variant="contained" onClick={loadMoreData} disabled={loading}>
                                {loading ? "Загрузка..." : "Загрузить ещё"}
                            </StyledButton>
                        </Box>
                    )}
                </div>
            </div>
            <FooterNavigation />
        </div>
    );
};

export default Library;