import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import CustomCard, {StyledButton} from "../components/CustomCard";
import cardPhoto from '../assets/cardPhoto.svg';
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../styles/Library.module.css";
import {fetchData} from "../features/fetchData";

export const Subscriptions = () => {
    const [data, setData] = useState([]);
    // const searchFields = ['name', 'description', 'author'];
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filteredData, setFilteredData] = useState(data);

    const handleFilterData = (filtered) => {
        setFilteredData(filtered);
    };
// Mock TODO real server request
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
    return (
        <div className={styles.mainContainer}>
            <HeaderComponent />
            <div className={styles.subscriptionsTitle}>
                <table className={styles.chapterName} style={{marginTop: '3vh', marginLeft: '2vh'}}>
                    <tbody>
                    <tr>
                        <th>
                            <Typography variant="h4" component="div" className={styles.subscHeader}>
                                Subscriptions
                            </Typography>
                        </th>
                        <th className={styles.subscriptionsSubtitle}>
                            {/*TODO smth with styles*/}
                            <Typography className={styles.subscriptionsSubtitleText} style={{ color: "#6D6D6D", paddingTop: '1.8vh'}} variant="body2">
                                — [səbˈskrɪpʃ(ə)ns] <br />
                                (en.) подписки
                            </Typography>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.categoryFilterBox}>
                <CategoryFilter onFilter={handleFilterData} />
            </div>
            <div className={styles.cardContainer}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
                            <CustomCard
                                key={index}
                                id={index}
                                name={item.name}
                                description={item.description}
                                tags={item.tags}
                                duration={item.duration}
                                author={item.author}
                                subscribers={item.subscribers}
                                cardPhoto={item.cardPhoto}
                                type={item.type}
                            />
                        </div>
                    ))
                ) : (
                    <div className={styles.noContentBox}>
                        <Typography variant="h8" component="div" className={styles.noContentText}>
                            Кажется, пока что у нас такого нет...
                        </Typography>
                    </div>
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
            <FooterNavigation />
        </div>
    );
};

export default Subscriptions;
