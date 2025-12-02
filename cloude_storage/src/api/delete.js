import { api } from "./api";

export const deleteFile = async (fileId) => {
    try {
        
        const response = await api.delete(`/files/${fileId}/delete/`)
        
        if (response.status === 204) {
            alert('Файл успешно удален')
        }
    } catch (error) {
        console.error('Ошибка при удалении файла DeleteFile:', error)
    }
}