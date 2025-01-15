import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Стили
const EditProfileContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
`;

const AvatarContainer = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    border-radius: 50%;
    background-color: #f0f0f0; 
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledAvatarPreview = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ddd;
    background-color: #f0f0f0;
`;

const ChangeAvatarButton = styled.label`
    position: absolute;
    bottom: 7px;
    right: 7px;
    background-color: #173E47;
    color: white;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid white;
    font-size: 18px;
    aspect-ratio: 1; 
    box-sizing: border-box;
z-index: 100;
    
    &:hover {
        background-color: #0d2b33;
    }

    input {
        display: none;
    }
`;

const SaveButton = styled.button`
    padding: 10px;
    background-color: #173E47;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0d2b33;
    }
`;

const CancelButton = styled.button`
    padding: 10px;
    background-color: #ddd;
    color: black;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #bbb;
    }
`;

const EditProfilePage = () => {
    const navigate = useNavigate();


    const [avatar, setAvatar] = useState("https://via.placeholder.com/120"); // Мок аватара

    const [username, setUsername] = useState("Ваше имя");
    const [socialLink, setSocialLink] = useState("https://example.com");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProfile = {
            avatar,
            username,
            socialLink,
        };

        console.log("Обновленные данные профиля:", updatedProfile);


        // Здесь можно отправить данные на сервер
        // fetch('/api/profile', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedProfile)
        // }).then(response => response.json())
        //   .then(data => console.log(data));


        alert("Профиль успешно обновлен!");
        navigate("/Profile");
    };

    return (
        <EditProfileContainer>
            <Header>Редактирование профиля</Header>
            <Form onSubmit={handleSubmit}>
                <Label>Аватар</Label>
                <AvatarContainer>
                    <StyledAvatarPreview src={avatar} alt="Avatar Preview" />
                    <ChangeAvatarButton>
                        <span>✏️</span>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </ChangeAvatarButton>
                </AvatarContainer>


                <Label>Имя пользователя</Label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Label>Ссылка на соцсеть</Label>
                <Input
                    type="url"
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                />

                <SaveButton type="submit">Сохранить</SaveButton>
                <CancelButton type="button" onClick={() => navigate("/Profile")}>
                    Отменить
                </CancelButton>
            </Form>
        </EditProfileContainer>
    );
};

export default EditProfilePage;
