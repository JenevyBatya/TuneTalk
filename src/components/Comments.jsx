import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import {StyledButton} from "./CustomCard";

const Comments = ({ comments }) => {
    const [newComment, setNewComment] = React.useState("");

    const handleAddComment = () => {
        if (newComment.trim()) {
            console.log("Добавлен комментарий:", newComment);
            setNewComment(""); // Очистка поля ввода
        }
    };

    return (
        <Box>
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

            <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Новый комментарий..."
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                sx={{ marginBottom: 2 }}
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
