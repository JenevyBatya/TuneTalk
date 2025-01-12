import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegPage from "./RegPage";
import '@testing-library/jest-dom/extend-expect';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("RegPage Component", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = require("react-router-dom").useNavigate;
        mockNavigate.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the registration form correctly", () => {
        render(
            <BrowserRouter>
                <RegPage />
            </BrowserRouter>
        );


        expect(screen.getByRole("button", { name: /Создать аккаунт/i })).toBeInTheDocument();


        expect(screen.getByRole("heading", { name: /Создать аккаунт/i })).toBeInTheDocument();


        expect(screen.getByLabelText("Логин")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
        expect(screen.getByLabelText("Повторите пароль")).toBeInTheDocument();
    });


    it("shows an error when passwords do not match", () => {
        render(
            <BrowserRouter>
                <RegPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Логин"), { target: { value: "TestUser" } });
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "Password123" } });
        fireEvent.change(screen.getByLabelText("Повторите пароль"), { target: { value: "Password456" } });

        fireEvent.click(screen.getByRole("button", { name: /Создать аккаунт/i }));

        expect(screen.getByText("Пароли не совпадают")).toBeInTheDocument();
    });

    it("shows an error when password is too short", () => {
        render(
            <BrowserRouter>
                <RegPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Логин"), { target: { value: "TestUser" } });
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "123" } });
        fireEvent.change(screen.getByLabelText("Повторите пароль"), { target: { value: "123" } });

        fireEvent.click(screen.getByRole("button", { name: /Создать аккаунт/i }));

        expect(screen.getByText("Пароль должен содержать не менее 6 символов")).toBeInTheDocument();
    });

    it("navigates to /library on successful registration", async () => {
        mockNavigate.mockImplementation(jest.fn());

        render(
            <BrowserRouter>
                <RegPage />
            </BrowserRouter>
        );


        fireEvent.change(screen.getByLabelText("Логин"), { target: { value: "TestUser" } });
        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "Password123" } });
        fireEvent.change(screen.getByLabelText("Повторите пароль"), { target: { value: "Password123" } });


        fireEvent.click(screen.getByRole("button", { name: /Создать аккаунт/i }));


        await screen.findByText(/успешно зарегистрированы/i);


        expect(mockNavigate).toHaveBeenCalledWith("/library");
    });

});
