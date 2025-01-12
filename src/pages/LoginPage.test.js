import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("рендерит все основные элементы компонента", () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/Логин или Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/Войти/i)).toBeInTheDocument();
        expect(screen.getByText(/Нет аккаунта\?/i)).toBeInTheDocument();
    });

    it("отображает ошибку, если поля не заполнены", async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Войти/i));

        await waitFor(() => {
            expect(screen.getByText(/Both fields are required/i)).toBeInTheDocument();
        });
    });

    it("отображает ошибку при неверном формате email или коротком логине", async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: "ab" },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByText(/Войти/i));

        await waitFor(() => {
            expect(
                screen.getByText(/Please enter a valid email or username/i)
            ).toBeInTheDocument();
        });
    });

    it("успешно выполняет вход при корректных данных", async () => {
        axios.post.mockResolvedValue({ status: 200 });

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByText(/Войти/i));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/library");
        });
    });

    it("отображает ошибку при неправильных данных для входа", async () => {
        axios.post.mockRejectedValue({ response: { status: 400 } });

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: "wrongpassword" },
        });
        fireEvent.click(screen.getByText(/Войти/i));

    });

    it("отображает ошибку, если email не найден", async () => {
        axios.post.mockRejectedValue({ response: { status: 404 } });

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Логин или Email/i), {
            target: { value: "unknown@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Пароль/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByText(/Войти/i));

    });

});
