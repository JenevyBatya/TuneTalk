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

const FileInput = styled.input`
    font-size: 14px;
    padding: 5px;
`;

const AvatarPreview = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 15px;
    display: block;
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

    const [avatar, setAvatar] = useState("https://via.placeholder.com/100"); // Мок аватара
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
                <AvatarPreview src={avatar} alt="Avatar Preview" />
                <FileInput type="file" accept="image/*" onChange={handleAvatarChange} />

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
