import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo1 from "../assets/rec1.jpg";
import photo2 from "../assets/rec2.jpg";
import photo3 from "../assets/rec3.jpg";
import auth1 from "../assets/auth1.jpg"
import auth2 from "../assets/auth2.jpg"
import auth3 from "../assets/auth3.jpg"
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
    Photo, RecommendDiv
} from "../styles/LandingPageStyles";
import {Link} from "react-router-dom";
import Bugsnag from "@bugsnag/js";
import HeaderComponent from '../components/HeaderComponent';
import FooterNavigation from '../components/FooterComponent';

const images = [photo1, photo2, photo3];
const authors = [auth1, auth2, auth3];
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
    Bugsnag.notify(new Error('Test error'))

    return (
        <MainContainer>
            <div>
            {/*<HeaderBlock></HeaderBlock>*/}
                <HeaderComponent/>
            <RecBlock>
                <HeadingText1>
                    Хостинг подкастов
                </HeadingText1>
                <Text1>
                    Все русскоязычные подкасты на одной платформе. Возможность переключаться между аудио и видео
                    форматами в один клик. Удобный поиск. Эксклюзивные подборки.
                </Text1>
                <PhotoDiv>
                    <Slider {...settings}>
                        {images.map((src, index) => (
                            <Photo key={index} src={src} alt={`photo ${index + 1}`}
                                   style={{width: '100%', height: 'auto'}}/>
                        ))}
                    </Slider>


                </PhotoDiv>
                <RecommendDiv>
                    Рекомендуем посмотреть
                </RecommendDiv>
            </RecBlock>
            <RegBlock>
                <HeadingText2>
                    Любимые авторы в одном месте
                </HeadingText2>
                <Text2>
                    Мы собрали всех ваших любимых авторов, чтобы вы наслаждались ими без лишних сложностей.
                </Text2>
                <PhotoDiv>
                    <Slider {...settings}>
                        {authors.map((src, index) => (
                            <Photo
                                key={index}
                                src={src}
                                alt={`auth ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover'
                                }}
                            />
                        ))}
                    </Slider>

                </PhotoDiv>
                <RecommendDiv>
                <StyledButton as={Link} to="/Registration">
                    Зарегистрироваться
                </StyledButton>
                </RecommendDiv>

            </RegBlock>
            </div>

            <FooterNavigation/>
        </MainContainer>
    );
}

export default LandingPage;
