import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function FooterNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Синхронизируем значение `value` с текущим маршрутом
    useEffect(() => {
        switch (location.pathname) {
            case '/library':
                setValue(0);
                break;
            case '/subscriptions':
                setValue(1);
                break;
            case '/account':
                setValue(2);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleNavigation = (newValue) => {
        setValue(newValue); // Обновляем состояние для мгновенного визуального эффекта
        switch (newValue) {
            case 0:
                navigate('/library'); // Переход на страницу "Библиотека"
                break;
            case 1:
                navigate('/subscriptions'); // Переход на страницу "Мои подписки"
                break;
            case 2:
                navigate('/account'); // Переход на страницу "Мой аккаунт"
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
                marginTop: '80px',
                zIndex: 1000, // Устанавливаем z-index, чтобы подвал был на переднем плане
            }}
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
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
