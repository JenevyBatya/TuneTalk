import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Для удобных матчеров, таких как toBeInTheDocument
import VideoPlayer from "./VideoPlayer";

describe("VideoPlayer", () => {
    const mockProps = {
        videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "45:32",
        likes: 567, // хотя likes не используется в рендере, его можно оставить для расширения
        cardPhoto: "cardPhoto.svg", // cardPhoto также не используется
        name: "Самый хороший подкаст",
    };

    test("корректно рендерит iframe с переданным src и атрибутами", () => {
        render(<VideoPlayer {...mockProps} />);

        const iframe = screen.getByTitle(mockProps.name); // Используем title для поиска
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", mockProps.videoSrc);
        expect(iframe).toHaveAttribute("width", "100%");
        expect(iframe).toHaveAttribute("height", "400");
        expect(iframe).toHaveAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    });

    test("корректно отображает название видео", () => {
        render(<VideoPlayer {...mockProps} />);

        const videoName = screen.getByText(mockProps.name);
        expect(videoName).toBeInTheDocument();
        expect(videoName.tagName).toBe("H6"); // Проверяем, что это заголовок H6
    });

    test("корректно отображает длительность видео", () => {
        render(<VideoPlayer {...mockProps} />);

        const durationText = screen.getByText(`Длительность: ${mockProps.duration}`);
        expect(durationText).toBeInTheDocument();
        expect(durationText).toHaveClass("MuiTypography-body2"); // Проверяем, что используется правильный класс
    });
});
