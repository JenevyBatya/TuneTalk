import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomCard, { StyledButton } from "./CustomCard";

// Мок для useNavigate
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("CustomCard Component", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    });

    const defaultProps = {
        id: "1",
        name: "Test Podcast",
        description: "This is a test podcast description",
        tags: [{ text: "tech" }, { text: "education" }],
        duration: "30 mins",
        author: "Test Author",
        subscribers: 1000,
        cardPhoto: "test-image.jpg",
    };

    it("renders the component with all props", () => {
        render(
            <MemoryRouter>
                <CustomCard {...defaultProps} />
            </MemoryRouter>
        );

        // Проверяем отображение имени
        expect(screen.getByText(defaultProps.name)).toBeInTheDocument();

        // Проверяем описание
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

        // Проверяем теги
        expect(screen.getByText("#tech")).toBeInTheDocument();
        expect(screen.getByText("#education")).toBeInTheDocument();

        // Проверяем продолжительность
        expect(screen.getByText(defaultProps.duration)).toBeInTheDocument();

        // Проверяем автора и подписчиков
        expect(screen.getByText(defaultProps.author)).toBeInTheDocument();
        expect(
            screen.getByText(`${defaultProps.subscribers} подписчиков`)
        ).toBeInTheDocument();

        // Проверяем изображение
        const image = screen.getByAltText("Podcast");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", defaultProps.cardPhoto);
    });

    it("navigates to the correct route when the 'Слушать' button is clicked", () => {
        render(
            <MemoryRouter>
                <CustomCard {...defaultProps} />
            </MemoryRouter>
        );

        const listenButton = screen.getByRole("button", { name: /слушать/i });
        expect(listenButton).toBeInTheDocument();

        // Клик по кнопке
        fireEvent.click(listenButton);

        // Проверяем, что navigate был вызван с правильным маршрутом
        expect(mockNavigate).toHaveBeenCalledWith(`/Audio-podcast/${defaultProps.id}`);
    });

    it("renders StyledButton with correct styles", () => {
        render(
            <MemoryRouter>
                <StyledButton>Тестовая кнопка</StyledButton>
            </MemoryRouter>
        );

        const button = screen.getByRole("button", { name: /тестовая кнопка/i });
        expect(button).toHaveStyle("background-color: #173E47");
        expect(button).toHaveStyle("color: #fff");
    });
});
