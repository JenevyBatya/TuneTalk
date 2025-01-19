import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioCutterPage from "./AudioCutterPage";

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
    test("Рендер основных компонентов", () => {
        render(<AudioCutterPage />);

        expect(screen.getByText("HeaderComponent")).toBeInTheDocument();
        expect(screen.getByText("FooterComponent")).toBeInTheDocument();
        expect(screen.getByLabelText("Название")).toBeInTheDocument();
        expect(screen.getByLabelText("Описание")).toBeInTheDocument();
        expect(screen.getByText("Категории")).toBeInTheDocument();
    });

    test("Обновление AudioCutter при изменении полей", () => {
        render(<AudioCutterPage />);

        const titleInput = screen.getByLabelText("Название");
        fireEvent.change(titleInput, { target: { value: "Новое название" } });
        expect(screen.getByText("Title: Новое название")).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText("Описание");
        fireEvent.change(descriptionInput, { target: { value: "Новое описание" } });
        expect(screen.getByText("Description: Новое описание")).toBeInTheDocument();
    });
});
