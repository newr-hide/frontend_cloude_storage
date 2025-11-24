import S from './FormFileUploader.module.css'
import { Button } from '../Button/Button'
import { useState } from 'react'
import { Input } from '../Input/Input'

export function FormFileUploader() {
    const [fileName, setFileName] = useState('')
    return(
        <form className={S.uploadContainer} action="">
            <Input />
            <input id={S.fileInput} type="file" />
            <label className={S.labelInput} for="file-input">Выберите файл</label>
            
            <div></div>
            <Button title={'Загрузить'}/>  
        </form>
    )
}