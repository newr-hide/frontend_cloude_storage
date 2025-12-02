import { api } from "./api";

export const upload = async (data) => {
    try {
        const formData = new FormData()
        formData.append('file', data.file)
        formData.append('comment', data.comment)

        const response = await api.post('/files/', formData)
        
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Ошибка авторизации: токен недействителен')
        }
        if (error.response && error.response.status === 403) {
            throw new Error('У вас нет прав на загрузку файлов')
        }
        throw new Error('Произошла ошибка при загрузке файла')
    }
};