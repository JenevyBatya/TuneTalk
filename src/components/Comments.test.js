import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Comments from "./Comments";
import { addCommentToBackend } from "../features/fetchData";

jest.mock("../features/fetchData", () => ({
    addCommentToBackend: jest.fn(),
}));

describe("Компонент Comments", () => {
    let mockSetComments;
    let initialComments;

    beforeEach(() => {
        mockSetComments = jest.fn();
        initialComments = [
            { id: 1, author: "User1", text: "Тестовый комментарий 1" },
            { id: 2, author: "User2", text: "Тестовый комментарий 2" },
        ];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Отображение начальных комментариев", () => {
        render(<Comments comments={initialComments} setComments={mockSetComments} />);

        expect(screen.getByText("Тестовый комментарий 1")).toBeInTheDocument();
        expect(screen.getByText("Тестовый комментарий 2")).toBeInTheDocument();
    });

    it("Не добавляет пустой комментарий", () => {
        const { getByText } = render(
            <Comments comments={initialComments} setComments={mockSetComments} />
        );

        const button = getByText("Отправить");

        expect(button).toBeDisabled();
    });
});
