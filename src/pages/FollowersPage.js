import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';


const MainContainer = styled.div`
padding: 20px;
`
const UserItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const BackButton = styled.button`
    background-color: #173e47;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0d2b33;
    }
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.span`
    font-weight: bold;
`;

const SearchInput = styled.input`
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const FollowersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Мокаем данные подписчиков и подписок
    const mockFollowers = [
        { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/40?img=1' },
        { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/40?img=2' },
        { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/40?img=3' },
        { id: 4, name: 'Diana', avatar: 'https://i.pravatar.cc/40?img=4' }
    ];

    const mockSubscriptions = [
        { id: 1, name: 'Tech Talks', avatar: 'https://i.pravatar.cc/40?img=5' },
        { id: 2, name: 'Music Vibes', avatar: 'https://i.pravatar.cc/40?img=6' },
        { id: 3, name: 'Travel Diaries', avatar: 'https://i.pravatar.cc/40?img=7' },
        { id: 4, name: 'Healthy Life', avatar: 'https://i.pravatar.cc/40?img=8' }
    ];

    // Подбор данных (подписчиков или подписок)
    const { type } = useParams();
    console.log(type);
    useEffect(() => {
        // Выводим тип, чтобы убедиться, что он передается корректно
        console.log(type); // Проверьте в консоли, что type получен

        // Мокаем запрос данных подписчиков и подписок в зависимости от типа
        if (type === 'followers') {
            setUsers(mockFollowers);
        } else if (type === 'subscriptions') {
            setUsers(mockSubscriptions);
        }
    }, [type]); // Добавляем зависимость от type, чтобы обновлять данные при изменении параметра
    useEffect(() => {
        // Мокаем запрос данных подписчиков и подписок в зависимости от типа
        if (type === 'followers') {
            setUsers(mockFollowers);
        } else if (type === 'subscriptions') {
            setUsers(mockSubscriptions);
        }
    }, [type]);

    useEffect(() => {
        // Фильтрация пользователей по запросу
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleNavigateBack = () => {
        navigate('/profile'); // Возврат на страницу профиля
    };

    const displayedUsers = searchQuery ? filteredUsers : users;

    return (
        <MainContainer>
            <BackButton onClick={handleNavigateBack}>Назад</BackButton>
            <Title>{type === 'followers' ? 'Подписчики' : 'Подписки'}</Title>
            <SearchInput
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                    <UserItem
                        key={user.id}
                        onClick={() =>
                            navigate(`/OtherProfile/${user.id}`, {
                                state: {
                                    user: {
                                        ...user,
                                        avatar: user.avatar.replace("40", "800"),
                                    },
                                },
                            })
                        }
                    >
                        <Avatar src={user.avatar} alt={user.name} />
                        <UserName>{user.name}</UserName>
                    </UserItem>

                ))
            ) : (
                <p>Нет данных для отображения</p>
            )}

        </MainContainer>
    );
};

export default FollowersPage;
