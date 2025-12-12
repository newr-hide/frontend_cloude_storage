import { AccountForm } from '../../components/AccountForm/AccountForm'
import { FormFileUploader } from '../../components/FormFileUploader/FormFileUploader'
import S from './AccountPage.module.css'
import { FileList } from '../../components/FileList/FileList'
import { useState } from 'react'
import { api } from '../../api/api'
import { deleteFile } from '../../api/deleteFile'
import { useEffect} from 'react'

export function AccountPage() {
    const [fileList, setFileList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const handleRefresh = async () => {
        try {
            setIsLoading(true)
            const response = await api.get('/files/')
            // console.log(response.data)
            setFileList(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Ошибка при обновлении списка файлов:', error)
            alert('Не удалось обновить список файлов')
            setIsLoading(false)
        }
    }
      useEffect(()=> {
            handleRefresh()
        },[])
  
    const handleFileDelete = async (fileId) => {
        if (window.confirm('Вы уверены, что хотите удалить файл?')) {
        try {
            await deleteFile(fileId)
            await handleRefresh()
        } catch (error) {
            console.error('Ошибка при удалении файла accountPage:', error)
        }}
    }

    return(
        <div className={S.global}>
            <AccountForm submitText={'Выйти'}/>
            <h2 className={S.title}>Мои документы</h2>

            {isLoading && <div>Загрузка файлов...</div>}
            <FormFileUploader onSuccess={handleRefresh}/>
            <FileList fileList={fileList} onRefresh={handleRefresh} onDelete={handleFileDelete}/>
            
        
        </div>
    )
}