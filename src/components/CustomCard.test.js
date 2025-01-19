import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomCard, { StyledButton } from "./CustomCard";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Компонент CustomCard", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    });

    const defaultProps = {
        id: "1",
        name: "Тестовый подкаст",
        description: "Это описание тестового подкаста",
        tags: [{ text: "технологии" }, { text: "образование" }],
        duration: "30 минут",
        author: "Тестовый автор",
        subscribers: 1000,
        cardPhoto: "test-image.jpg",
    };

    it("Отображение компонента с переданными пропсами", () => {
        render(
            <MemoryRouter>
                <CustomCard {...defaultProps} />
            </MemoryRouter>
        );

        expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
        expect(screen.getByText("#технологии")).toBeInTheDocument();
        expect(screen.getByText("#образование")).toBeInTheDocument();
        expect(screen.getByText(defaultProps.duration)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.author)).toBeInTheDocument();
        expect(
            screen.getByText(`${defaultProps.subscribers} подписчиков`)
        ).toBeInTheDocument();

        const image = screen.getByAltText("Podcast");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", defaultProps.cardPhoto);
    });

    it("Переход по маршруту при клике на кнопку 'Слушать'", () => {
        render(
            <MemoryRouter>
                <CustomCard {...defaultProps} />
            </MemoryRouter>
        );

        const listenButton = screen.getByRole("button", { name: /слушать/i });
        expect(listenButton).toBeInTheDocument();

        fireEvent.click(listenButton);

        expect(mockNavigate).toHaveBeenCalledWith(`/Audio-podcast/${defaultProps.id}`);
    });

    it("Отображение StyledButton с корректными стилями", () => {
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
