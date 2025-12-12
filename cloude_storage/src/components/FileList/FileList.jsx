import S from './FileList.module.css'
import {Button} from '../Button/Button'
//Для иконок на кнопки
import DownloadIcon from '@mui/icons-material/Download' 
import VisibilityIcon from '@mui/icons-material/Visibility'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'

import { Snackbar } from '@mui/material'

import { useState } from 'react'
import { downloadFile } from '../../api/downloadFile'
import { createShareLink } from '../../api/shareLinks'
import { Input } from '../Input/Input'
import { updateFile } from '../../api/updateFile'
import { showFile } from '../../api/showFile'

export function FileList({fileList =[], onRefresh, onDelete}) {
    const [copied, setCopied] = useState(false)
    const [shareUrl, setShareUrl] = useState('')
    const [editingFile, setEditingFile] = useState(null)
    const [newName, setNewName] = useState('')
    const [newComment, setNewComment] = useState('')
    

    const sortedFiles = [...fileList].sort((a, b) => {
        // console.log(fileList)
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

    const handleCopyLink = async (url) => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            console.error('Не удалось скопировать ссылку:', err)
        }
    }

    const handleCreateShareLink = async (fileId) => {
        try {
            
            const url = await createShareLink(fileId)
            setShareUrl(url)
            handleCopyLink(url)
        } catch (error) {
            console.error('Ошибка при создании ссылки:', error)
        }
    }

    const handleEditName = (file) => {
        setEditingFile({ ...file, editingName: true })
        setNewName(getFileName(file.original_name))
    }
    
    const handleSave = async (fileId) => {
        try {
            
            if(newName){
            const response = await updateFile(fileId, { original_name: newName })
            setEditingFile(null)
            setNewName('')}
            if(newComment){
                const response = await updateFile(fileId, { comment: newComment })
            setEditingFile(null)
            setNewComment('')
            }

            if (onRefresh) {
                onRefresh();
            }
        } catch (error) {
            console.error('Ошибка при сохранении редактирования файла:', error)
        }
    }

    const handleEditComment = (file) => {
        setEditingFile({ ...file, editingComment: true })
        setNewComment(file.comment)
    }

    const handleShowFile = async (fileId) => {
        // console.log(fileId)
        try {
            await showFile(fileId)

        } catch (error) {
            
        }
    }

    return(
        <>
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
                <td className={S.label}>{editingFile?.id === file.id && editingFile.editingName ? (
                                <Input 
                                    type="text" 
                                    value={newName} 
                                    onChange={(e) => setNewName(e.target.value)} 
                                    className={S.input}
                                    onBlur={() => handleSave(file.id)}
                                />
                            ) : (
                                <span 
                                    onClick={() => handleEditName(file)}
                                >
                                    {getFileName(file.original_name)}
                                </span>
                            )}</td>
                <td className={S.label}>{editingFile?.id === file.id && editingFile.editingComment ? (
                                <Input 
                                    value={newComment} 
                                    onChange={(e) => setNewComment(e.target.value)} 
                                    className={S.input}
                                    onBlur={() => handleSave(file.id)}
                                />
                            ) : (
                                <span 
                                    onClick={() => handleEditComment(file)}
                                >
                                    {file.comment}
                                </span>
                            )}</td>
                <td className={S.label}>{formatFileSize(file.file_size)}</td>
                <td className={S.label}>{formatDate(file.uploaded_at)}</td>
                <td className={S.label}>{file.last_downloaded}</td>
                <td>
                    <div>
                        <Button onClick={() => {handleDownload(file.id, getFileName(file.file))}} title={<DownloadIcon />} className={S.btn}/>  
                        <Button onClick={() => {handleShowFile(file.id)}} title={<VisibilityIcon />} className={S.btn}/>
                        <Button title={<ShareIcon/> } onClick={() => handleCreateShareLink(file.id)} className={S.btn}/>
                        
                        <Button onClick={() => onDelete(file.id)} title={<DeleteIcon />} className={S.btn}/>
                    </div>
                </td>
            </tr>
))}
        </tbody>
        </table>
        <Snackbar
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                open={copied}
                autoHideDuration={2000}
                message="Ссылка скопирована!"
                
            />
        </>
    )
}