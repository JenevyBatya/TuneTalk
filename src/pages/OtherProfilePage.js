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
import { useLocation, useNavigate } from "react-router-dom";
import Star from "../assets/icons/ProfileStar.svg";
import Sections from "../components/Sections";
import ContentContainer from "../components/ContentContainer";
import CustomCard from "../components/CustomCard";
import cardData from "../mocks/CardData.json"; // Моки данных для контента
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

    // Загружаем данные в зависимости от выбранной вкладки
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
        if (!user) {
            navigate("/profile"); // Если данных пользователя нет, перенаправляем на страницу профиля
        }
    }, [user, navigate]);

    useEffect(() => {
        fetchData(activeSection);
    }, [activeSection]);

    // Отображаем контент в зависимости от выбранной вкладки
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
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        tags={item.tags}
                        duration={item.duration}
                        author={item.author}
                        subscribers={item.subscribers}
                        cardPhoto={item.cardPhoto}
                        type={item.type}
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
                            <LinkText href={user?.socialLink || "#"} target="_blank" rel="noopener noreferrer">
                                {user?.socialLink || "Ссылка на соцсеть"}
                            </LinkText>
                        </LinkDiv>
                        <SubscribeDiv>
                            <ButtonForSubscribe />
                        </SubscribeDiv>
                    </InfoDiv>
                </ProfileContainer>

                <StatsContainer>
                    <StarIcon src={Star} alt="Star Icon" />
                    <StatsItem onClick={() => navigate("/Users/followers")} style={{ cursor: "pointer" }}>
                        <StatText>{user?.followersCount || "0"} подписчиков</StatText>
                    </StatsItem>

                    <StarIcon src={Star} alt="Star Icon" />
                    <StatsItem onClick={() => navigate("/Users/subscriptions")} style={{ cursor: "pointer" }}>
                        <StatText>{user?.subscriptionsCount || "0"} подписок</StatText>
                    </StatsItem>

                    <StarIcon src={Star} alt="Star Icon" />
                    <StatsItem>
                        <StatText>{user?.postsCount || "0"} публикаций</StatText>
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
