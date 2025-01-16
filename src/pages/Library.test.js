import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Library from "./Library";
import { fetchData } from "../features/fetchData";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../features/fetchData");

describe("Компонент Library", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("загружает и отображает данные", async () => {
        const mockedData = [
            {
                id: 1,
                name: "Mocked Name 1",
                description: "Mocked Description",
                tags: [{ id: 1, text: "Tag1" }],
                duration: "10 min",
                author: "Mocked Author",
                subscribes: 10,
                photo: "mockedPhoto.svg",
            },
        ];

        fetchData.mockResolvedValue(mockedData);

        render(
            <Router>
                <Library />
            </Router>
        );

        const cardElement = await screen.findByText("Mocked Name 1");
        expect(cardElement).toBeInTheDocument();
    });

    it("отображает сообщение 'Нет данных', когда нет элементов", async () => {
        fetchData.mockResolvedValue([]);

        render(
            <Router>
                <Library />
            </Router>
        );

        const noDataElement = await screen.findByText("Кажется, пока что у нас такого нет...");
        expect(noDataElement).toBeInTheDocument();
    });

    it("загружает дополнительные данные при клике на 'Загрузить ещё'", async () => {
        const mockedDataPage1 = [
            {
                id: 1,
                name: "Mocked Name 1",
                description: "Mocked Description",
                tags: [{ id: 1, text: "Tag1" }],
                duration: "10 min",
                author: "Mocked Author",
                subscribes: 10,
                photo: "mockedPhoto.svg",
            },
        ];
        const mockedDataPage2 = [
            {
                id: 2,
                name: "Mocked Name 2",
                description: "Mocked Description 2",
                tags: [{ id: 2, text: "Tag2" }],
                duration: "20 min",
                author: "Mocked Author 2",
                subscribes: 20,
                photo: "mockedPhoto2.svg",
            },
        ];

        fetchData.mockResolvedValueOnce(mockedDataPage1).mockResolvedValueOnce(mockedDataPage2);

        render(
            <Router>
                <Library />
            </Router>
        );

        const loadMoreButton = await screen.findByText("Загрузить ещё");

        const firstCard = await screen.findByText("Mocked Name 1");
        expect(firstCard).toBeInTheDocument();

        fireEvent.click(loadMoreButton);

        const secondCard = await screen.findByText("Mocked Name 2");
        expect(secondCard).toBeInTheDocument();
    });

    it("скрывает кнопку 'Загрузить ещё', когда данных больше нет", async () => {
        const mockedData = [
            {
                id: 1,
                name: "Mocked Name 1",
                description: "Mocked Description",
                tags: [{ id: 1, text: "Tag1" }],
                duration: "10 min",
                author: "Mocked Author",
                subscribes: 10,
                photo: "mockedPhoto.svg",
            },
        ];

        fetchData.mockResolvedValueOnce(mockedData).mockResolvedValueOnce(null);

        render(
            <Router>
                <Library />
            </Router>
        );

        const loadMoreButton = await screen.findByText("Загрузить ещё");
        fireEvent.click(loadMoreButton);

        await waitFor(() => {
            expect(loadMoreButton).not.toBeInTheDocument();
        });
    });
});
