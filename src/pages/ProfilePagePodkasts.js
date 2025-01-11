import React, { useState, useEffect } from "react";
import {
    ProfileContainer,
    Pic,
    InfoDiv,
    Username,
    Description,
    LinkDiv,
    LinkLogo,
    LinkText,
    EditButtonDiv,
    EditButton,
    StatsContainer,
    StatsItem,
    StatText,
    MainContainer,
    StarIcon,
} from "../styles/ProfilePagePodkastsStyles";

import UserPic from "../assets/auth2.jpg";
import LinkIcon from "../assets/icons/searchIcon.svg";
import Star from "../assets/icons/ProfileStar.svg";
import Sections from "../components/Sections";
import ContentContainer from "../components/ContentContainer";
import CustomCard from "../components/CustomCard";
import cardData from "../mocks/CardData.json";

const ProfilePagePodkasts = () => {
    const [activeSection, setActiveSection] = useState(0); // Состояние текущей вкладки
    const [content, setContent] = useState([]); // Состояние данных для отображения
    const [loading, setLoading] = useState(false); // Состояние загрузки

    // Функция для загрузки данных с сервера
    //async-----------|
    const fetchData =  (section) => {
        setLoading(true);
        try {
            // const response = await fetch('../mocks/CardData.json');
            // const data = await response.json();
            // let response;
            switch (section) {
                case 0: // Подкасты
                    setContent(cardData.podcasts);
                    // response = await fetch("/api/podcasts");
                    break;
                case 1: // Плейлисты
                    setContent(cardData.playlists);
                    // response = await fetch("/api/playlists");
                    break;
                case 2: // Избранное
                    setContent(cardData.liked);
                    // response = await fetch("/api/liked");
                    break;
                case 3: // Сохраненное
                    setContent(cardData.saved);
                    // response = await fetch("/api/saved");
                    break;
                default:
                    setContent([]);
                    // response = [];
            }
            // const data = await response.json();
            // setContent(data);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            setContent([]);
        } finally {
            setLoading(false);
        }
    };

    // Загружаем данные при изменении активного раздела
    useEffect(() => {
        fetchData(activeSection);
    }, [activeSection]);

    // Генерация контента для отображения
    const renderContent = () => {
        if (loading) {
            return <div>Загрузка...</div>;
        }
        if (!content.length) {
            return <div>Нет данных для отображения.</div>;
        }
        return (
            <div>
                {content.map((item, index) => (
                    <CustomCard
                        key={index}
                        name={item.name}
                        description={item.description}
                        tags={item.tags}
                        duration={item.duration}
                        author={item.author}
                        subscribers={item.subscribers}
                        cardPhoto={item.cardPhoto}
                    />
                ))}
            </div>
        );
    };

    return (
        <MainContainer>
            <ProfileContainer>
                <Pic src={UserPic} alt="User" />

                <InfoDiv>
                    <Username>Имя Фамилия</Username>
                    <Description>Описание профиля</Description>
                    <LinkDiv>
                        <LinkLogo src={LinkIcon} alt="Link Icon" />
                        <LinkText href="https://vk.com/user" target="_blank" rel="noopener noreferrer">
                            vk.com/user
                        </LinkText>
                    </LinkDiv>
                    <EditButtonDiv>
                        <EditButton>Изменить профиль</EditButton>
                    </EditButtonDiv>
                </InfoDiv>
            </ProfileContainer>

            <StatsContainer>
                <StarIcon src={Star} alt="" />
                <StatsItem>
                    <StatText>100 подписчиков</StatText>
                </StatsItem>
                <StarIcon src={Star} alt="" />
                <StatsItem>
                    <StatText>200 подписок</StatText>
                </StatsItem>
                <StarIcon src={Star} alt="" />
                <StatsItem>
                    <StatText>50 публикаций</StatText>
                </StatsItem>
            </StatsContainer>

            <Sections setActiveSection={setActiveSection} />

            <ContentContainer>
                {renderContent()}
            </ContentContainer>
        </MainContainer>
    );
};

export default ProfilePagePodkasts;
