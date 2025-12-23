import { api } from "./api";

export const getUserFiles = async (userId) => {
    try {
        const response = await api.get(`/files/user/${userId}`)
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении файлов');
    }
};