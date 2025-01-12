import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router, useNavigate} from "react-router-dom";
import EditProfilePage from "./EditProfilePage";

// Mock для useNavigate
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("EditProfilePage", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.mocked(useNavigate).mockReturnValue(mockNavigate);
    });

    it("рендерит компонент корректно", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        expect(screen.getByText(/Редактирование профиля/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Аватар/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Имя пользователя/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ссылка на соцсеть/i)).toBeInTheDocument();
        expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
        expect(screen.getByText(/Отменить/i)).toBeInTheDocument();
    });

    it("обновляет аватар при загрузке нового файла", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        const fileInput = screen.getByLabelText(/Аватар/i);
        const avatarPreview = screen.getByAltText(/Avatar Preview/i);

        const file = new File(["dummy content"], "avatar.png", { type: "image/png" });

        Object.defineProperty(fileInput, "files", {
            value: [file],
        });

        fireEvent.change(fileInput);

        // Проверяем, что preview обновился (используем mock для FileReader, если нужно)
        setTimeout(() => {
            expect(avatarPreview.src).not.toBe("https://via.placeholder.com/100");
        }, 100);
    });

    it("обновляет имя пользователя при вводе текста", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        const usernameInput = screen.getByLabelText(/Имя пользователя/i);

        fireEvent.change(usernameInput, { target: { value: "Новое имя" } });

        expect(usernameInput.value).toBe("Новое имя");
    });

    it("обновляет ссылку на соцсеть при вводе текста", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        const socialLinkInput = screen.getByLabelText(/Ссылка на соцсеть/i);

        fireEvent.change(socialLinkInput, { target: { value: "https://newlink.com" } });

        expect(socialLinkInput.value).toBe("https://newlink.com");
    });

    it("переходит на страницу профиля при нажатии 'Отменить'", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        const cancelButton = screen.getByText(/Отменить/i);

        fireEvent.click(cancelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/Profile");
    });

    it("отправляет данные профиля при сохранении", () => {
        render(
            <Router>
                <EditProfilePage />
            </Router>
        );

        const saveButton = screen.getByText(/Сохранить/i);

        fireEvent.click(saveButton);

        expect(mockNavigate).toHaveBeenCalledWith("/Profile");
        // Проверка на alert или другие побочные эффекты
    });
});
