import S from './FileList.module.css'
import {Button} from '../Button/Button'
//Для иконок на кнопки
import DownloadIcon from '@mui/icons-material/Download' 
import VisibilityIcon from '@mui/icons-material/Visibility'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'

import { downloadFile } from '../../api/downloadFile'

export function FileList({fileList =[], onDelete}) {
    
    const sortedFiles = [...fileList].sort((a, b) => {
        return new Date(b.uploaded_at) - new Date(a.uploaded_at)
    })

    const getFileName = (fullPath) => {
       
        try {
            if (!fullPath) return 'Неизвестно'
            const fileName = fullPath.split('/').pop()
            return decodeURIComponent(fileName)
        } catch (error) {
            console.warn('Ошибка при получении имени файла:', error)
            return 'Неизвестно'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    const formatFileSize = (size) => {
        if (!size) return '0 байт';
        const units = ['байт', 'КБ', 'МБ', 'ГБ']
        let i = 0
        while (size > 1024 && i < units.length - 1) {
            size /= 1024
            i++
        }
        return `${size.toFixed(2)} ${units[i]}`
    }

    const handleDownload = async (fileId, fileName) => {
       console.log(fileId)
        try {
            await downloadFile(fileId, fileName)
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error)
            
        }
    };

    return(
        
        <table className={S.listDocument}>
        <thead className={S.titleList}>
            <tr>
            <th className={S.label}>Название</th>
            <th className={S.label}>Комментарий</th>
            <th className={S.label}>Размер</th>
            <th className={S.label}>Дата Загрузки</th>
            <th className={S.label}>Дата скачивания</th>
            <th className={S.label}>Действия</th>
            </tr>
        </thead>
        <tbody>
            {sortedFiles.map((file) => (
                
            <tr key={file.id}>
                <td className={S.label}>{getFileName(file.file)}</td>
                <td className={S.label}>{file.comment}</td>
                <td className={S.label}>{formatFileSize(file.size)}</td>
                <td className={S.label}>{formatDate(file.uploaded_at)}</td>
                <td className={S.label}>{file.dateDownload}</td>
                <td>
                    <div>
                        <Button onClick={() => {handleDownload(file.id, getFileName(file.file))}} title={<DownloadIcon />} className={S.btn}/>  
                        <Button title={<VisibilityIcon />} className={S.btn}/>
                        <Button title={<ShareIcon />} className={S.btn}/>
                        <Button onClick={() => onDelete(file.id)} title={<DeleteIcon />} className={S.btn}/>
                    </div>
                </td>
            </tr>
))}
        </tbody>
        </table>
    )
}