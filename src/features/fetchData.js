import cardPhoto from "../assets/cardPhoto.svg";
import axios from "axios";
const BACKEND_URL = "http://26.227.27.136:80/comments"; //TODO

export const fetchData = async (page) => {
    // TODO real request
    const limit = 10;
    const start = (page - 1) * limit;
    const serverData = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Name ${i + 1}`,
        description: "Description/Theme",
        tags: [{ id: 1, text: "tags" }, { id: 2, text: "tags" }, { id: 3, text: "tags" }],
        duration: "60 min",
        author: `Author ${i + 1}`,
        subscribers: Math.floor(Math.random() * 1000), // Генерация подписчиков
        cardPhoto: cardPhoto,
        type: i % 2 === 0 ? "audio" : "video",
    }));
    const result = serverData.slice(start, start + limit);
    return result.length > 0 ? result : null;
};

export const addCommentToBackend = async (comment) => {
    // TODO real request
    try {
        const response = await axios.post(BACKEND_URL, comment);
        return response.data;
    } catch (error) {
        console.error("Ошибка при отправке комментария:", error);
        throw new Error("Не удалось отправить комментарий.");
    }
};
