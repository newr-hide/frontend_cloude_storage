import { api } from "./api"

export const downloadFile = async (fileId, FileName) => {
    try {
        const response = await api.get(`/download/${fileId}`, {
            responseType: 'blob'})
        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = FileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Ошибка при скачивании файла:', error)
        alert('Произошла ошибка при скачивании файла')
    }
}