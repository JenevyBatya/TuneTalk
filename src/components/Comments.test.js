import { render, screen, fireEvent } from "@testing-library/react";
import Comments from "./Comments";
import "@testing-library/jest-dom"; // Для дополнительных матчеров, таких как .toBeInTheDocument

describe("Comments Component", () => {
    const mockComments = [
        { id: 1, author: "Пользователь 1", text: "Первый комментарий" },
        { id: 2, author: "Пользователь 2", text: "Второй комментарий" },
    ];

    test("renders a list of comments", () => {
        render(<Comments comments={mockComments} />);

        // Проверяем, что все комментарии отображаются
        mockComments.forEach((comment) => {
            expect(screen.getByText(comment.author)).toBeInTheDocument();
            expect(screen.getByText(comment.text)).toBeInTheDocument();
        });
    });

    test("allows text input in the new comment field", () => {
        render(<Comments comments={mockComments} />);
        const textField = screen.getByPlaceholderText("Новый комментарий...");

        // Проверяем, что можно ввести текст
        fireEvent.change(textField, { target: { value: "Новый текст" } });
        expect(textField.value).toBe("Новый текст");
    });

    test("disables the 'Отправить' button when input is empty", () => {
        render(<Comments comments={mockComments} />);
        const button = screen.getByRole("button", { name: /отправить/i });

        // Кнопка должна быть отключена, если поле ввода пустое
        expect(button).toBeDisabled();
    });

    test("enables the 'Отправить' button when input is not empty", () => {
        render(<Comments comments={mockComments} />);
        const textField = screen.getByPlaceholderText("Новый комментарий...");
        const button = screen.getByRole("button", { name: /отправить/i });

        // Вводим текст и проверяем, что кнопка становится активной
        fireEvent.change(textField, { target: { value: "Новый текст" } });
        expect(button).toBeEnabled();
    });

    test("clears the input field after submitting a comment", () => {
        render(<Comments comments={mockComments} />);
        const textField = screen.getByPlaceholderText("Новый комментарий...");
        const button = screen.getByRole("button", { name: /отправить/i });

        // Вводим текст, отправляем, проверяем, что поле очистилось
        fireEvent.change(textField, { target: { value: "Новый комментарий" } });
        fireEvent.click(button);
        expect(textField.value).toBe("");
    });

    test("logs the new comment when submitted", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        render(<Comments comments={mockComments} />);
        const textField = screen.getByPlaceholderText("Новый комментарий...");
        const button = screen.getByRole("button", { name: /отправить/i });

        // Вводим текст, отправляем, проверяем вызов console.log
        fireEvent.change(textField, { target: { value: "Комментарий для проверки" } });
        fireEvent.click(button);
        expect(consoleSpy).toHaveBeenCalledWith("Добавлен комментарий:", "Комментарий для проверки");

        consoleSpy.mockRestore(); // Восстанавливаем оригинальный метод
    });
});
