import React, {useEffect, useState} from "react";
import { Box, Typography } from "@mui/material";
import CustomCard, {StyledButton} from "../components/CustomCard";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import '../styles/Library.css';
import {fetchData} from "../features/fetchData";

export const Library = () => {
    const [data, setData] = useState([]);
    const searchFields = ['name', 'description', 'author'];
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
                    <Box className="noData">
                        <Typography variant="body1" className="noDataText">
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
