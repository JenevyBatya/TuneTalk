import React, {useState} from "react";
import {Box, TextField, Typography,  IconButton} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";
import HeaderComponent from "../components/HeaderComponent";
import AudioCutter from "../components/AudioCutter";
import CategoryChipFilter from "../components/CategoryChipFilter";
import FooterComponent from "../components/FooterComponent";

const AudioCutterPage = () => {
    const [coverPreview, setCoverPreview] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState(["Криминал", "Секс", "Дизайн"]);
    const [selectedTags, setSelectedTags] = useState(tags);
    const username = localStorage.getItem("username");

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveCover = () => {
        setCoverPreview(null);
        setCoverFile(null);
    };

    const containerStyle = {

        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "start",
    };

    return (
        <div>
            <HeaderComponent/>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                {/* Загрузка изображения */}
                <Box
                    sx={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => document.getElementById("cover-upload").click()}
                >
                    {coverPreview ? (
                        <>
                            <img
                                src={coverPreview}
                                alt="Cover Preview"
                                style={{width: "100%", height: "100%", objectFit: "cover"}}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    zIndex: 2,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveCover();
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </>
                    ) : (
                        <Typography color="textSecondary">Загрузить фото</Typography>
                    )}
                    <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={handleCoverFileChange}
                    />
                </Box>
                {/* Поля для ввода текста и теги */}
                <Box sx={{flex: 1}}>
                    <TextField
                        label="Название"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                    <TextField
                        label="Описание"
                        fullWidth
                        variant="outlined"
                        size="small"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    padding: "20px",
                    boxSizing: "border-box",
                    borderTop: "1px solid #ccc",
                }}
            >
                <CategoryChipFilter
                    selectedCategories={selectedTags}
                    setSelectedCategories={setSelectedTags}
                    containerStyle={containerStyle}
                />
            </Box>

            <AudioCutter
                coverFile={coverFile}
                title={title}
                description={description}
                tags={selectedTags}
                username={username}
            />
            <FooterComponent/>
        </div>
    );
};

export default AudioCutterPage;
