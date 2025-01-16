import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import OtherProfilePage from "../pages/OtherProfilePage";
import cardData from "../mocks/CardData.json";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

jest.mock("../components/Sections", () => jest.fn(({ setActiveSection }) => (
    <div data-testid="sections">
        <button onClick={() => setActiveSection(0)}>Подкасты</button>
        <button onClick={() => setActiveSection(1)}>Плейлисты</button>
        <button onClick={() => setActiveSection(2)}>Понравилось</button>
        <button onClick={() => setActiveSection(3)}>Сохранено</button>
    </div>
)));
jest.mock("../components/CustomCard", () => jest.fn(({ name }) => <div>{name}</div>));
jest.mock("../components/FooterComponent", () => jest.fn(() => <footer>Footer</footer>));
jest.mock("../components/HeaderComponent", () => jest.fn(() => <header>Header</header>));
jest.mock("../components/ButtonForSubscribe", () => jest.fn(() => <button>Подписаться</button>));

describe("Страница OtherProfilePage", () => {
    const mockNavigate = jest.fn();
    const mockUser = {
        avatar: "test-avatar.png",
        name: "Иван Иванов",
        description: "Описание профиля",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        useLocation.mockReturnValue({ state: { user: mockUser } });
    });

    it("Открывает страницу подписчиков при клике на количество подписчиков", () => {
        render(<OtherProfilePage />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByText("100 подписчиков"));
        expect(mockNavigate).toHaveBeenCalledWith("/Users/followers");
    });

    it("Открывает страницу подписок при клике на количество подписок", () => {
        render(<OtherProfilePage />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByText("50 подписок"));
        expect(mockNavigate).toHaveBeenCalledWith("/Users/subscriptions");
    });
});
