import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Library from "./Library";
import { fetchData } from "../features/fetchData";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../features/fetchData");

describe("Компонент Library", () => {
    afterEach(() => {
        jest.clearAllMocks();
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
