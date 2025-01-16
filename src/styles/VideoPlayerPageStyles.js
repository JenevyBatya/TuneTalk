import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    height: 100vh;
    overflow-y: auto;
`;

export const VideoContainer = styled.div`
    width: 100%;
    max-width: 600px;
    position: relative;
`;

export const InfoContainer = styled.div`
    width: 100%;
    max-width: 600px;
    background: #1e1e1e;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
`;

export const Title = styled.h2`
    font-size: 18px;
    margin: 0 0 5px;
`;

export const Stats = styled.p`
    font-size: 14px;
    color: #aaa;
    margin: 5px 0;
`;

export const Tags = styled.div`
    margin: 10px 0;
`;

export const Tag = styled.span`
    color: #ffa500;
    font-size: 12px;
    margin-right: 10px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SubscribeButton = styled.button`
    background-color: #173e47;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
`;

export const AddToPlaylistButton = styled.button`
    background-color: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;

    &:hover {
        color: #ffa500;
    }
`;

export const CommentSection = styled.div`
    margin-top: 20px;
    width: 100%;
`;

export const CommentInput = styled.textarea`
    width: 100%;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    resize: none;
`;
