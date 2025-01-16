import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AudioCutterPage from "./AudioCutterPage";

// Mock дочерние компоненты
jest.mock("../components/HeaderComponent", () => () => <div>HeaderComponent</div>);
jest.mock("../components/FooterComponent", () => () => <div>FooterComponent</div>);
jest.mock("../components/AudioCutter", () => (props) => (
    <div data-testid="audio-cutter">
        <div>AudioCutter Component</div>
        <div>Title: {props.title}</div>
        <div>Description: {props.description}</div>
        <div>Tags: {props.tags.join(", ")}</div>
    </div>
));

describe("AudioCutterPage", () => {
    test("рендерит все основные компоненты", () => {
        render(<AudioCutterPage />);

        // Проверка рендера Header и Footer
        expect(screen.getByText("HeaderComponent")).toBeInTheDocument();
        expect(screen.getByText("FooterComponent")).toBeInTheDocument();

        // Проверка на наличие полей для ввода текста
        expect(screen.getByLabelText("Название")).toBeInTheDocument();
        expect(screen.getByLabelText("Описание")).toBeInTheDocument();

        // Проверка рендера CategoryChipFilter
        expect(screen.getByText("Категории")).toBeInTheDocument();
    });


    test("обновляет дочерний компонент AudioCutter при изменении полей", () => {
        render(<AudioCutterPage />);

        // Изменить значение названия
        const titleInput = screen.getByLabelText("Название");
        fireEvent.change(titleInput, { target: { value: "Новое название" } });
        expect(screen.getByText("Title: Новое название")).toBeInTheDocument();

        // Изменить описание
        const descriptionInput = screen.getByLabelText("Описание");
        fireEvent.change(descriptionInput, { target: { value: "Новое описание" } });
        expect(screen.getByText("Description: Новое описание")).toBeInTheDocument();
    });

});
