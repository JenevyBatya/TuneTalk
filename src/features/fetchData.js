import cardPhoto from "../assets/cardPhoto.svg";
import axios from "axios";
const BACKEND_URL = "https://small-duck.ru"; 

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
        subscribes: 1,
        photo: cardPhoto
    }));
    const result = serverData.slice(start, start + limit);
    return result.length > 0 ? result : null;
};


// Функция для получения комментариев
export const fetchCommentsFromBackend = async (audioId) => {
    try {
        const response = await axios.get(BACKEND_URL+`/api/comments/${audioId}`);
        return response.data; // axios автоматически парсит JSON
    } catch (error) {
        throw new Error("Не удалось загрузить комментарии");
    }
};

// Функция для добавления нового комментария
export const addCommentToBackend = async (commentData) => {
    try {
        const response = await axios.post(BACKEND_URL+"/api/comments/post", commentData);
        return response.data; // axios автоматически парсит JSON
    } catch (error) {
        throw new Error("Не удалось отправить комментарий");
    }
};

