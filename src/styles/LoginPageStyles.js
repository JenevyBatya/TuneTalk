import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    max-width: 600px;
    height: 100vh;
    background-color: #AECBC9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin: 0 auto;
    border-radius: 8px;
    color: white;
    text-align: left;
`;
export const HeadingText = styled.h2`
    font-size: 24px;
    color: #074753;
    margin-bottom: 5%;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Input = styled.input`
    padding: 12px;
    font-size: 16px;
    border: 1px solid #adc9c7;
    border-radius: 8px;
    outline: none;

    &:focus {
        border-color: #074753;
    }
`;

export const StyledButton = styled.button`
    width: 100%;
    background-color: #074753;
    color: white;
    font-size: 16px;
    //padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    height: 55px;
    margin-top: 20px;
    text-decoration: none;
    text-align: center;
    align-content: center;

    &:hover {
        background-color: #05333b;
    }
`;

export const GoogleButton = styled(StyledButton)`
    background-color: rgba(7, 70, 82, 0.7);

    &:hover {
        background-color: rgba(7, 70, 82, 0.85);
    }
`;

export const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin: -8px 0 8px 0;
`;

export const LoginLink = styled.p`
    margin-top: 16px;
    font-size: 14px;
    color: #000000;
    text-align: center;

    a {
        color: #FF6A00;
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
        }
    }
`;
export const FormContainer = styled.div`
    width: 80%;
    background-color: #FFFFFF;
    padding: 5%;
    padding-top: 2%;
    border-radius: 10px;
`;