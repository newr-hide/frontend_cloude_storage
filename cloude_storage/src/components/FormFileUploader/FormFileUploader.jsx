import S from './FormFileUploader.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { Input } from '../Input/Input'
import { upload } from '../../api/fileUpload'
import {useNavigate} from 'react-router-dom'
import { api } from '../../api/api'

export function FormFileUploader({ onSuccess }) {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('Выбрать файл')
    const [comment, setComment] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setFileName(selectedFile.name);
          setFile(selectedFile);
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('Отправляем POST-запрос')

        try {
            if (!file) {
                throw new Error('Нет файла для загрузки')
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('comment', comment);
            formData.append('original_name', file.name);

            // Добавляем логирование отправляемых данных
            console.log('Отправляем данные:', {
                file: file.name,
                comment: comment,
                original_name: file.name
            });

            const response = await api.post('/files/', formData)

            console.log('Ответ сервера:', response.data)

            if (onSuccess) {
                onSuccess()
            }

            setFileName('Загрузить файл')
            setFile(null)
            setComment('')
            setError('')

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/')
            } else {
                setError(error.message || 'Произошла ошибка при загрузке файла')
            }
        }
    }
   
    return(
        <form className={S.uploadContainer}  onSubmit={handleSubmit}>
            <input id={S.fileInput} type="file" onChange={handleFileChange}/>
            <label className={S.labelInput} htmlFor={S.fileInput} >{fileName} </label>
            <Input value={comment} onChange={(e)=> (setComment(e.target.value))} placeholder="Комментарий к файлу"/>
            <Button title={'Загрузить'}/>  
            {error && <div className={S.error}>{error}</div>}
        </form>
    )
}