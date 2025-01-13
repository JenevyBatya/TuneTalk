export const fetchData = async (page) => {
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
        photo: "mockedPhoto.svg",
    }));
    const result = serverData.slice(start, start + limit);
    return result.length > 0 ? result : null;
};
