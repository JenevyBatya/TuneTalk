import { render, screen, fireEvent } from "@testing-library/react";
import SubscribeButton from "./ButtonForSubscribe";
import "@testing-library/jest-dom";

describe("Компонент SubscribeButton", () => {
    test("отображает кнопку с начальным текстом 'Подписаться'", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Подписаться");
    });

    test("изменяет текст на 'Подписаны' при клике", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        fireEvent.click(button);
        expect(button).toHaveTextContent("Подписаны");
    });

    test("переключает текст обратно на 'Подписаться' при повторном клике", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        fireEvent.click(button);
        fireEvent.click(button);
        expect(button).toHaveTextContent("Подписаться");
    });

});
