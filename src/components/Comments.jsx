import React from "react";
import { Box, Typography, Avatar, TextField} from "@mui/material";
import { StyledButton } from "./CustomCard";
import {addCommentToBackend} from "../features/fetchData";

const Comments = ({ comments, setComments }) => {
    const [newComment, setNewComment] = React.useState("");

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const username = localStorage.getItem("username") || "Unknown user";

            const commentData = {
                id: Date.now(), // Уникальный ID для нового комментария
                author: username,
                text: newComment,
            };
            setComments((prevComments) => [...prevComments, commentData]);
            setNewComment("");
            try {
                // TODO MOCK
                await addCommentToBackend(commentData);
            } catch (error) {
                console.error("Ошибка при добавлении комментария:", error);
            }
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: 1,
                    marginBottom: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                }}
            >
            {comments.map((comment) => (
                <Box
                    key={comment.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                    }}
                >
                    <Avatar sx={{ bgcolor: "#757575", marginRight: 2 }}></Avatar>
                    <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                            {comment.author}
                        </Typography>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Box>
                </Box>
            ))}
            </Box>
            <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Новый комментарий..."
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                sx={{
                    marginBottom: 1,
                    backgroundColor: "#F1F1F1",
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none",
                        },
                    },
                }}
            />
            <StyledButton
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
            >
                Отправить
            </StyledButton>
        </Box>
    );
};

export default Comments;
