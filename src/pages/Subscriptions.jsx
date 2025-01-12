import React, { useState } from 'react';
import { Typography } from "@mui/material";
import CustomCard from "../components/CustomCard";
import cardPhoto from '../assets/cardPhoto.svg';
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../styles/Library.module.css";  // Импортируем файл стилей

const Subscriptions = () => {
    const data = [
        {
            id: 1,
            name: "Name",
            description: "Description/Theme",
            tags: [{ id: 1, text: "tags" }, { id: 2, text: "tags" }, { id: 3, text: "tags" }],
            duration: "60 min",
            author: "author",
            subscribes: 1,
            photo: cardPhoto
        },
        {
            id: 2,
            name: "Test",
            description: "Description/Theme",
            tags: [{ id: 1, text: "tags" }, { id: 2, text: "tags" }, { id: 3, text: "tags" }],
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
            <HeaderComponent />
            <div className={styles.subscriptionsTitle}>
                <table className={styles.chapterName} style={{marginTop: '3vh'}}>
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
                    <div className={styles.noContentBox}>
                        <Typography variant="h8" component="div" className={styles.noContentText}>
                            Кажется, пока что у нас такого нет...
                        </Typography>
                    </div>
                )}
            </div>
            <FooterNavigation />
        </div>
    );
};

export default Subscriptions;
