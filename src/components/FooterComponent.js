import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function FooterNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleNavigation = (newValue) => {
        setValue(newValue);
        // Навигация по индексам
        switch (newValue) {
            case 0:
                navigate('/library'); // Путь для "Библиотеки"
                break;
            case 1:
                navigate('/subscriptions'); // Путь для "Мои подписки"
                break;
            case 2:
                navigate('/account'); // Путь для "Мой аккаунт"
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                height: '80px',
                backgroundColor: '#173E47',
                maxWidth: '600px',
                zIndex: 1000, // Устанавливаем z-index, чтобы подвал был на переднем плане
            }}
            value={value}
            onChange={(event, newValue) => {
                handleNavigation(newValue);
            }}
        >
            <BottomNavigationAction
                label="Библиотека"
                icon={<LibraryBooksIcon />}
                sx={{
                    color: value === 0 ? '#FFFFFF' : '#9DB2CE', // Подсветка активного элемента
                    gap: '8px',
                }}
            />
            <BottomNavigationAction
                label="Мои подписки"
                icon={<SubscriptionsIcon />}
                sx={{
                    color: value === 1 ? '#FFFFFF' : '#9DB2CE',
                    gap: '8px',
                }}
            />
            <BottomNavigationAction
                label="Мой аккаунт"
                icon={<AccountCircleIcon />}
                sx={{
                    color: value === 2 ? '#FFFFFF' : '#9DB2CE',
                    gap: '8px',
                }}
            />
        </BottomNavigation>
    );
}

export default FooterNavigation;
