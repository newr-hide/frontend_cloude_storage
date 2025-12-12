import S from './FormFileUploader.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { Input } from '../Input/Input'
import { upload } from '../../api/fileUpload'
import {useNavigate} from 'react-router-dom'

export function FormFileUploader({ onSuccess }) {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('Выбрать файл')
    const [comment, setComment] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('Токен отсутствует в localStorage')
            
            navigate('/')
        }
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setFileName(selectedFile.name);
          setFile(selectedFile);
        }
      };

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Отправляем POST-запрос');
       
        // console.log(fileName, comment)
        try {
            if(!file) {
                throw new Error('Нет файла для загрузки')
            }
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Отсутствует токен авторизации');
            }

            const uploadData = {
                file: file,
                comment: comment
            };
            // console.log(uploadData)
            await upload(uploadData, token)
            if (onSuccess) {
                onSuccess()
            }

            setFileName('Загрузить файл');
            setFile(null);
            setComment('');
            setError('');
            
        } catch (error) {
            setError(error.message);
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