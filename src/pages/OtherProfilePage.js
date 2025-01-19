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
    StatsContainer,
    StatsItem,
    StatText,
    MainContainer,
    StarIcon,
    FooterContainer,
    ProfileDiv,
    SubscribeDiv,
} from "../styles/ProfilePagePodkastsStyles";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Star from "../assets/icons/ProfileStar.svg";
import Sections from "../components/Sections";
import ContentContainer from "../components/ContentContainer";
import CustomCard from "../components/CustomCard";
import cardData from "../mocks/CardData.json";
import FooterNavigation from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import ButtonForSubscribe from "../components/ButtonForSubscribe";
import LinkIcon from "../assets/icons/LinkIcon.svg"

const OtherProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user; // Получаем данные пользователя из location.state

    const [activeSection, setActiveSection] = useState(0); // Состояние текущей вкладки
    const [content, setContent] = useState([]); // Состояние данных для отображения
    const [loading, setLoading] = useState(false); // Состояние загрузки
    //
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/profile"); // Если данных пользователя нет, перенаправляем на страницу профиля
    //     }
    // }, [user, navigate]);

    const fetchData = (section) => {
        setLoading(true);
        try {
            switch (section) {
                case 0:
                    setContent(cardData.podcasts);
                    break;
                case 1:
                    setContent(cardData.playlists);
                    break;
                case 2:
                    setContent(cardData.liked);
                    break;
                case 3:
                    setContent(cardData.saved);
                    break;
                default:
                    setContent([]);
            }
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            setContent([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(activeSection);
    }, [activeSection]);

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
            <HeaderComponent />
            <ProfileDiv>
                <ProfileContainer>
                    <Pic src={user?.avatar || ""} alt={user?.name || "User"} />
                    <InfoDiv>
                        <Username>{user?.name || "Имя Фамилия"}</Username>
                        <Description>{user?.description || "Описание профиля"}</Description>
                        <LinkDiv>
                            <LinkLogo src={LinkIcon} alt="Link Icon" />
                            <LinkText href="#" target="_blank" rel="noopener noreferrer">
                                vk.com/user
                            </LinkText>
                        </LinkDiv>
                        <SubscribeDiv>
                            <ButtonForSubscribe />
                        </SubscribeDiv>
                    </InfoDiv>
                </ProfileContainer>

                <StatsContainer>
                    <StarIcon src={Star} alt="" />
                    <StatsItem onClick={() => navigate("/Users/followers")} style={{ cursor: "pointer" }}>
                        <StatText>100 подписчиков</StatText>
                    </StatsItem>

                    <StarIcon src={Star} alt="" />
                    <StatsItem onClick={() => navigate("/Users/subscriptions")} style={{ cursor: "pointer" }}>
                        <StatText>50 подписок</StatText>
                    </StatsItem>

                    <StarIcon src={Star} alt="" />
                    <StatsItem>
                        <StatText>50 публикаций</StatText>
                    </StatsItem>
                </StatsContainer>

                <Sections setActiveSection={setActiveSection} />
                <ContentContainer>{renderContent()}</ContentContainer>
            </ProfileDiv>
            <FooterContainer>
                <FooterNavigation />
            </FooterContainer>
        </MainContainer>
    );
};

export default OtherProfilePage;
