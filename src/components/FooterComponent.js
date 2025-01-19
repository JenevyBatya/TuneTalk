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
            case '/Library':
                setValue(0);
                break;
            case '/Subscriptions':
                setValue(1);
                break;
            case '/Account':
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
                navigate('/Library'); // Переход на страницу "Библиотека"
                break;
            case 1:
                navigate('/Subscriptions'); // Переход на страницу "Мои подписки"
                break;
            case 2:
                navigate('/Profile'); // Переход на страницу "Мой аккаунт"
                break;
            default:
                break;
        }
    };

    return (
        <BottomNavigation
            sx={{
                fontFamily: 'Jost',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                height: '80px',
                backgroundColor: '#173E47',
                maxWidth: '600px',
                marginTop: '80px',
                zIndex: 1000,
            }}
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
        >
            <BottomNavigationAction
                label="Библиотека"
                icon={<LibraryBooksIcon />}
                aria-label="Библиотека" // Добавляем атрибут для тестирования
                sx={{
                    color: value === 0 ? '#FFFFFF' : '#9DB2CE',
                    gap: '8px',
                    fontFamily: 'Jost',
                }}
            />
            <BottomNavigationAction
                label="Мои подписки"
                icon={<SubscriptionsIcon />}
                aria-label="Мои подписки" // Добавляем атрибут для тестирования
                sx={{
                    color: value === 1 ? '#FFFFFF' : '#9DB2CE',
                    gap: '8px',
                    fontFamily: 'Jost',
                }}
            />
            <BottomNavigationAction
                label="Мой аккаунт"
                icon={<AccountCircleIcon />}
                aria-label="Мой аккаунт" // Добавляем атрибут для тестирования
                sx={{
                    color: value === 2 ? '#FFFFFF' : '#9DB2CE',
                    gap: '8px',
                    fontFamily: 'Jost',
                }}
            />

        </BottomNavigation>
    );
}

export default FooterNavigation;
