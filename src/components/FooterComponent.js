import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function FooterNavigation() {
     const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                height: '80px',
                backgroundColor: '#173E47',
            }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                label="Библиотека"
                icon={<LibraryBooksIcon />}
                sx={{
                    color: '#9DB2CE',
                    gap: '8px',
                }}
            />
            <BottomNavigationAction
                label="Мои подписки"
                icon={<SubscriptionsIcon />}
                sx={{
                    color: '#9DB2CE',
                    gap: '8px',
                }}
            />
            <BottomNavigationAction
                label="Мой аккаунт"
                icon={<AccountCircleIcon />}
                sx={{
                    color: '#9DB2CE',
                    gap: '8px',
                }}
            />
        </BottomNavigation>
    );
}

export default FooterNavigation;
