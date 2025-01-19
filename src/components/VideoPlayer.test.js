import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoPlayer from "./VideoPlayer";

describe("Компонент VideoPlayer", () => {
    const mockProps = {
        videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "45:32",
        likes: 567,
        cardPhoto: "cardPhoto.svg",
        name: "Самый хороший подкаст",
    };

    test("Рендерит iframe с правильными атрибутами", () => {
        render(<VideoPlayer {...mockProps} />);

        const iframe = screen.getByTitle(mockProps.name);
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", mockProps.videoSrc);
        expect(iframe).toHaveAttribute("width", "100%");
        expect(iframe).toHaveAttribute("height", "400");
        expect(iframe).toHaveAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    });

    test("Отображает название видео", () => {
        render(<VideoPlayer {...mockProps} />);

        const videoName = screen.getByText(mockProps.name);
        expect(videoName).toBeInTheDocument();
        expect(videoName.tagName).toBe("H6");
    });

    test("Отображает длительность видео", () => {
        render(<VideoPlayer {...mockProps} />);

        const durationText = screen.getByText(`Длительность: ${mockProps.duration}`);
        expect(durationText).toBeInTheDocument();
        expect(durationText).toHaveClass("MuiTypography-body2");
    });
});
