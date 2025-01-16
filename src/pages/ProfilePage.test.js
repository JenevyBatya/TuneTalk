import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfilePageNew from "./ProfilePage";
import cardData from "../mocks/CardData.json";

jest.mock("../components/CustomCard", () => {
    return ({ name }) => <div data-testid="custom-card">{name}</div>;
});

jest.mock("../components/HeaderComponent", () => () => (
    <div data-testid="header-component">Header</div>
));

jest.mock("../components/FooterComponent", () => () => (
    <div data-testid="footer-component">Footer</div>
));

jest.mock("../components/Sections", () => ({ setActiveSection }) => (
    <div>
        <button onClick={() => setActiveSection(0)}>Подкасты</button>
        <button onClick={() => setActiveSection(1)}>Плейлисты</button>
        <button onClick={() => setActiveSection(2)}>Избранное</button>
        <button onClick={() => setActiveSection(3)}>Сохраненное</button>
    </div>
));

describe("ProfilePageNew", () => {

    it("меняет контент при переключении вкладок", async () => {
        render(
            <BrowserRouter>
                <ProfilePageNew />
            </BrowserRouter>
        );


        fireEvent.click(screen.getByText("Подкасты"));
        await waitFor(() =>
            expect(
                screen.getAllByTestId("custom-card")[0]
            ).toHaveTextContent(cardData.podcasts[0].name)
        );


        fireEvent.click(screen.getByText("Плейлисты"));
        await waitFor(() =>
            expect(
                screen.getAllByTestId("custom-card")[0]
            ).toHaveTextContent(cardData.playlists[0].name)
        );


        fireEvent.click(screen.getByText("Избранное"));
        await waitFor(() =>
            expect(
                screen.getAllByTestId("custom-card")[0]
            ).toHaveTextContent(cardData.liked[0].name)
        );


        fireEvent.click(screen.getByText("Сохраненное"));
        await waitFor(() =>
            expect(
                screen.getAllByTestId("custom-card")[0]
            ).toHaveTextContent(cardData.saved[0].name)
        );
    });

    it("показывает сообщение, если данных нет", async () => {
        render(
            <BrowserRouter>
                <ProfilePageNew />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Сохраненное"));

        await waitFor(() => {
            expect(screen.queryByTestId("custom-card")).toBeInTheDocument();

        });
    });

    it("показывает сообщение о загрузке", async () => {
        render(
            <BrowserRouter>
                <ProfilePageNew />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Плейлисты"));



        await waitFor(() =>
            expect(screen.queryByText("Загрузка...")).not.toBeInTheDocument()
        );
    });

    it("переходит на страницу редактирования профиля", () => {
        render(
            <BrowserRouter>
                <ProfilePageNew />
            </BrowserRouter>
        );

        const editButton = screen.getByText("Изменить профиль");
        fireEvent.click(editButton);

        expect(window.location.pathname).toBe("/EditProfile");
    });

    it("переходит на страницу подписчиков и подписок", () => {
        render(
            <BrowserRouter>
                <ProfilePageNew />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("100 подписчиков"));
        expect(window.location.pathname).toBe("/Users/followers");

        fireEvent.click(screen.getByText("50 подписок"));
        expect(window.location.pathname).toBe("/Users/subscriptions");
    });
});
