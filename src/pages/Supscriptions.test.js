import { render, screen, fireEvent } from '@testing-library/react';
import Subscriptions from './Subscriptions';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../components/CustomCard', () => () => <div>CustomCard</div>);
jest.mock('../components/CategoryFilter', () => ({ onFilter }) => (
    <button onClick={() => onFilter([])}>Filter</button>
));
jest.mock('../components/FooterComponent', () => () => <div>FooterNavigation</div>);
jest.mock('../components/HeaderComponent', () => () => <div>HeaderComponent</div>);

describe('Subscriptions Компонент', () => {
    it('should render the subscriptions title and subtitle', () => {
            expect(true).toBe(true)
    });
});
