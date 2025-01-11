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
    StatText,
    MainContainer,
    StarIcon, UserInfo,
} from "../styles/ProfilePagePodkastsStyles";

import UserPic from "../assets/auth2.jpg";
import LinkIcon from "../assets/icons/searchIcon.svg";
import Star from "../assets/icons/ProfileStar.svg";
import Sections from '../components/Sections';

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



                    </InfoDiv>
                <StatsContainer>
                    <StatsItem>
                        <StatText>27</StatText> подписчиков
                    </StatsItem>
                    <StarIcon src={Star} alt={""}/>
                    <StatsItem>
                        <StatText>256</StatText> подписок
                    </StatsItem>
                    <StarIcon src={Star} alt={""}/>
                    <StatsItem>
                        <StatText>7</StatText> подкастов
                    </StatsItem>
                </StatsContainer>

            </ProfileContainer>

            {/* Разделы */
            }
            <Sections/>
        </MainContainer>
)
;
};

export default ProfilePagePodkasts;
