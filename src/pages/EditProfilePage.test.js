import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router, useNavigate} from "react-router-dom";
import EditProfilePage from "./EditProfilePage";


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

    });
});
