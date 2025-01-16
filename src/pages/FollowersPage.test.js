import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import FollowersPage from "./FollowersPage";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Компонент FollowersPage", () => {
    test("должна отображать подписчиков, когда тип 'followers'", () => {
        render(
            <MemoryRouter initialEntries={["/followers"]}>
                <Routes>
                    <Route path="/:type" element={<FollowersPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Подписчики")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    test("должна отображать подписки, когда тип 'subscriptions'", () => {
        render(
            <MemoryRouter initialEntries={["/subscriptions"]}>
                <Routes>
                    <Route path="/:type" element={<FollowersPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Подписки")).toBeInTheDocument();
        expect(screen.getByText("Tech Talks")).toBeInTheDocument();
        expect(screen.getByText("Music Vibes")).toBeInTheDocument();
    });

    test("должна фильтровать пользователей по запросу поиска", () => {
        render(
            <MemoryRouter initialEntries={["/followers"]}>
                <Routes>
                    <Route path="/:type" element={<FollowersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Поиск...");
        fireEvent.change(searchInput, { target: { value: "Alice" } });

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    test("должна показывать сообщение о том, что нет данных, когда запрос поиска не даёт совпадений", () => {
        render(
            <MemoryRouter initialEntries={["/followers"]}>
                <Routes>
                    <Route path="/:type" element={<FollowersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText("Поиск...");
        fireEvent.change(searchInput, { target: { value: "Nonexistent" } });

        expect(screen.getByText("Нет данных для отображения")).toBeInTheDocument();
    });

    test("должна переходить на страницу профиля при клике на кнопку 'Назад'", () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => navigate);

        render(
            <MemoryRouter initialEntries={["/followers"]}>
                <Routes>
                    <Route path="/:type" element={<FollowersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const backButton = screen.getByText("Назад");
        fireEvent.click(backButton);

        expect(navigate).toHaveBeenCalledWith("/profile");
    });
});
