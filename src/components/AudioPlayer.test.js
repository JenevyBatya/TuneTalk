import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "./AudioPlayer";

jest.mock("use-sound", () => {
    return jest.fn(() => [
        jest.fn(), // play
        {
            pause: jest.fn(), // pause
            sound: {
                duration: jest.fn(() => 120), // Возвращает длительность 120 секунд
                seek: jest.fn((value) => value), // Устанавливает и возвращает позицию
            },
        },
    ]);
});

describe("AudioPlayer Component", () => {
    const audioSrc = "test-audio.mp3";
    const likes = 10;
    const cardPhoto = "test-image.jpg";
    const name = "Test Audio";

    test("renders the component with correct data", () => {
        render(<AudioPlayer audioSrc={audioSrc} likes={likes} cardPhoto={cardPhoto} name={name} />);

        expect(screen.getByText(name)).toBeInTheDocument();
        expect(screen.getByText(likes.toString())).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    });

    test("toggles play/pause state on button click", () => {
        const { getByRole } = render(<AudioPlayer audioSrc={audioSrc} likes={likes} cardPhoto={cardPhoto} name={name} />);
        const playButton = getByRole("button", { name: /play/i });

        fireEvent.click(playButton); // Нажимаем на Play
        expect(screen.queryByRole("button", { name: /pause/i })).toBeInTheDocument();

        fireEvent.click(playButton); // Нажимаем на Pause
        expect(screen.queryByRole("button", { name: /play/i })).toBeInTheDocument();
    });

    test("increments like count when liked", () => {
        const { getByText } = render(<AudioPlayer audioSrc={audioSrc} likes={likes} cardPhoto={cardPhoto} name={name} />);
        const likeButton = screen.getByRole("button", { name: /like/i });
        const likeCount = getByText(likes.toString());

        fireEvent.click(likeButton); // Лайк
        expect(likeCount).toHaveTextContent((likes + 1).toString());

        fireEvent.click(likeButton); // Снятие лайка
        expect(likeCount).toHaveTextContent(likes.toString());
    });

    test("displays formatted time correctly", () => {
        const { getByText } = render(<AudioPlayer audioSrc={audioSrc} likes={likes} cardPhoto={cardPhoto} name={name} />);
        const formattedTime = getByText("0:00 / 2:00");
        expect(formattedTime).toBeInTheDocument();
    });

    test("seeks to a specific time on progress bar click", () => {
        const { container } = render(<AudioPlayer audioSrc={audioSrc} likes={likes} cardPhoto={cardPhoto} name={name} />);
        const progressBar = container.querySelector("[data-testid='progress-bar']");

        fireEvent.click(progressBar, { clientX: 50 }); // Кликаем на прогресс-бар
        expect(screen.getByText("1:00")).toBeInTheDocument();
    });
});
