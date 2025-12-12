import { api } from "./api"

export const createShareLink = async (fileId) => {
    // console.log(fileId)
    try {
        const response = await api.post('/create-share-link/', {'file-id': fileId})
        return response.data.share_url
    } catch (error) {
        throw new Error('Ошибка при создании публичной ссылки')
    }
}

export const downloadPublicFile = async (token) => {
    try {
        const response = await api.get(`/download-public/${token}`)
        return response
    } catch (error) {
        throw new Error('Ошибка при скачивании файла')
    }
}