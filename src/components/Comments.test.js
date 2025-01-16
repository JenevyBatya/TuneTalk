import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Comments from "./Comments";
import { addCommentToBackend } from "../features/fetchData";

jest.mock("../features/fetchData", () => ({
    addCommentToBackend: jest.fn(),
}));

describe("Comments Component", () => {
    let mockSetComments;
    let initialComments;

    beforeEach(() => {
        mockSetComments = jest.fn();
        initialComments = [
            { id: 1, author: "User1", text: "Test comment 1" },
            { id: 2, author: "User2", text: "Test comment 2" },
        ];
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders initial comments", () => {
        render(<Comments comments={initialComments} setComments={mockSetComments} />);

        // Проверяем, что изначальные комментарии отображаются
        expect(screen.getByText("Test comment 1")).toBeInTheDocument();
        expect(screen.getByText("Test comment 2")).toBeInTheDocument();
    });


    it("does not add an empty comment", () => {
        const { getByText } = render(
            <Comments comments={initialComments} setComments={mockSetComments} />
        );

        const button = getByText("Отправить");

        // Кнопка "Отправить" должна быть отключена при пустом комментарии
        expect(button).toBeDisabled();
    });

});
