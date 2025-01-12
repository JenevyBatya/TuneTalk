import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import FollowersPage from "./FollowersPage";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("FollowersPage Component", () => {
    test("renders followers when type is 'followers'", () => {
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

    test("renders subscriptions when type is 'subscriptions'", () => {
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

    test("filters users based on search query", () => {
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

    test("shows no data message when search query has no match", () => {
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

    test("navigates back to profile on 'Назад' button click", () => {
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
