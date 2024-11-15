import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import photo1 from "../assets/playlist.jpg";
import photo2 from "../assets/playlist.jpg";
import photo3 from "../assets/playlist.jpg";

import {
    HeadingText1,
    HeadingText2,
    MainContainer,
    RecBlock,
    RegBlock,
    StyledButton,
    Text2,
    Text1,
    HeaderBlock,
    PhotoDiv,
    Photo
} from "../styles/LandingPageStyles";
import {Link} from "react-router-dom";
import FooterNavigation from "../components/FooterComponent";

const images = [photo1, photo2, photo3];

const LandingPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <MainContainer>
            <HeaderBlock></HeaderBlock>
            <RecBlock>
                <HeadingText1>
                    Хостинг подкастов
                </HeadingText1>
                <Text1>
                    Все русскоязычные подкасты на одной платформе. Возможность переключаться между аудио и видео
                    форматами в один клик. Удобный поиск. Эксклюзивные подборки.
                </Text1>
                <PhotoDiv>
                    {/*<Slider {...settings}>*/}
                    {/*    {images.map((src, index) => (*/}
                    {/*        <Photo key={index} src={src} alt={`photo ${index + 1}`}*/}
                    {/*               style={{width: '100%', height: 'auto'}}/>*/}
                    {/*    ))}*/}
                    {/*</Slider>*/}


                </PhotoDiv>
                <StyledButton>
                    Рекомендуем посмотреть
                </StyledButton>
            </RecBlock>
            <RegBlock>
                <HeadingText2>
                    Любимые авторы в одном месте
                </HeadingText2>
                <Text2>
                    Мы собрали всех ваших любимых авторов, чтобы вы наслаждались ими без лишних сложностей.
                </Text2>
                <PhotoDiv>
                    {/*<Slider {...settings}>*/}
                    {/*    {images.map((src, index) => (*/}
                    {/*        <Photo*/}
                    {/*            key={index}*/}
                    {/*            src={src}*/}
                    {/*            alt={`photo ${index + 1}`}*/}
                    {/*            style={{*/}
                    {/*                width: '100%',*/}
                    {/*                height: 'auto',*/}
                    {/*                objectFit: 'cover'*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</Slider>*/}

                </PhotoDiv>
                <StyledButton as={Link} to="/Registration">
                    Зарегистрироваться
                </StyledButton>

            </RegBlock>
            <FooterNavigation/>
        </MainContainer>
    );
}

export default LandingPage;
