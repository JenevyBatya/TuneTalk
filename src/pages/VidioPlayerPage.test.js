import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import VideoPodcastPage from "./VideioPlayerPage";
import "@testing-library/jest-dom";

jest.mock("../components/VideoPlayer", () => () => <div data-testid="video-player" />);
jest.mock("../components/Comments", () => ({ comments }) => (
    <div data-testid="comments">{comments.length} комментариев</div>
));
jest.mock("../components/FooterComponent", () => () => <footer data-testid="footer" />);
jest.mock("../components/HeaderComponent", () => () => <header data-testid="header" />);
jest.mock("../components/ButtonForSubscribe", () => () => <button data-testid="subscribe-button">Подписаться</button>);

const mockVideoPodcastData = {
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    name: "Самый хороший подкаст",
    description: "Description of the video podcast...",
    author: "Азамат Мусагалиев",
    subscribers: 456,
    tags: ["юмор", "развитие"],
    duration: "45:32",
    cardPhoto: "cardPhoto.svg",
    likes: 567,
};

const mockComments = [
    { id: 1, author: "Иван", text: "Отличный видеоподкаст!", avatar: "" },
    { id: 2, author: "Мария", text: "поняла.", avatar: "" },
];

describe("Страница видеоподкаста", () => {
    test("Корректно отображает комментарии", async () => {
        render(<VideoPodcastPage />);

        await waitFor(() => expect(screen.getByTestId("comments")).toBeInTheDocument());
        expect(screen.getByText(`${mockComments.length} комментариев`)).toBeInTheDocument();
    });

    test("Корректно отображает теги", async () => {
        render(<VideoPodcastPage />);

        await waitFor(() => {
            mockVideoPodcastData.tags.forEach((tag) => {
                expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
            });
        });
    });
});
