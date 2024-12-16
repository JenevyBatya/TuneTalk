import React from "react";
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
    StatText, MainContainer
} from "../styles/ProfilePagePodkastsStyles";

import UserPic from "../assets/auth2.jpg"; // Замените на путь к изображению
import LinkIcon from "../assets/icons/searchIcon.svg"; // Замените на иконку

const ProfilePagePodkasts = () => {
    return (
        <MainContainer>
            <ProfileContainer>
                {/* Левая колонка */}
                <Pic src={UserPic} alt="User"/>

                {/* Правая колонка */}
                <InfoDiv>
                    <Username>Имя Фамилия</Username>
                    <Description>описание профиля текст текст текст</Description>

                    {/* Ссылка */}
                    <LinkDiv>
                        <LinkLogo src={LinkIcon} alt="Link Icon"/>
                        <LinkText href="https://vk.com/user" target="_blank" rel="noopener noreferrer">
                            vk.com/user
                        </LinkText>
                    </LinkDiv>

                    {/* Кнопка */}
                    <EditButtonDiv>
                        <EditButton>изменить профиль</EditButton>
                    </EditButtonDiv>

                    {/* Статистика */}
                    <StatsContainer>
                        <StatsItem>
                            <StatText>27</StatText> подписчиков
                        </StatsItem>
                        <StatsItem>
                            <StatText>256</StatText> подписок
                        </StatsItem>
                        <StatsItem>
                            <StatText>7</StatText> подкастов
                        </StatsItem>
                    </StatsContainer>
                </InfoDiv>
            </ProfileContainer>
        </MainContainer>
    );
};

export default ProfilePagePodkasts;
