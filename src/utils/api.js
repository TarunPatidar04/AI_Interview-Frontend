import axios from "axios";
import { API_BASE_URL } from "../config";

const interviewApi = axios.create({
    baseURL: `${API_BASE_URL}/interview`,
    withCredentials: true,
});

export const getInterviewHistory = async () => {
    const response = await interviewApi.get("/history");
    return response.data;
};

export const startInterview = async (formData) => {
    // formData could be FormData object for file upload
    const response = await interviewApi.post("/resume", formData);
    return response.data;
};

export const generateQuestions = async (data) => {
    // data contains role, experience, mode, resumeText, projects, skills
    const response = await interviewApi.post("/generate-questions", data);
    return response.data;
};

export const submitAnswer = async (data) => {
    // data contains interviewId, questionId, answer, questionIndex, timeTaken
    const response = await interviewApi.post("/submit-answer", data);
    return response.data;
};

export const finishInterview = async (interviewId) => {
    const response = await interviewApi.post("/finish", { interviewId });
    return response.data;
};

export default interviewApi;
