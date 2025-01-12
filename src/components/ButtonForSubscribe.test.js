import { render, screen, fireEvent } from "@testing-library/react";
import SubscribeButton from "./ButtonForSubscribe"; // путь к вашему компоненту
import "@testing-library/jest-dom"; // для использования дополнительных матчеров, таких как .toBeInTheDocument

describe("SubscribeButton Component", () => {
    test("renders the button with initial text 'Подписаться'", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Подписаться");
    });

    test("changes text to 'Подписаны' when clicked", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        fireEvent.click(button);
        expect(button).toHaveTextContent("Подписаны");
    });

    test("toggles text back to 'Подписаться' when clicked again", () => {
        render(<SubscribeButton />);
        const button = screen.getByRole("button", { name: /подписаться/i });
        fireEvent.click(button); // Первое нажатие
        fireEvent.click(button); // Второе нажатие
        expect(button).toHaveTextContent("Подписаться");
    });

    test("matches the snapshot", () => {
        const { asFragment } = render(<SubscribeButton />);
        expect(asFragment()).toMatchSnapshot();
    });
});
