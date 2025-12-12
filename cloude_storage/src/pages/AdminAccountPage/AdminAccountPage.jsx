import S from './AdminAccountPage.module.css'
import { AccountForm } from '../../components/AccountForm/AccountForm'
import { ListMenu } from '../../components/ListMenu/ListMenu'
import { FormFileUploader } from '../../components/FormFileUploader/FormFileUploader'
import { FileList } from '../../components/FileList/FileList'
import { useState, useEffect } from 'react'
import { api } from '../../api/api'
import { deleteFile } from '../../api/deleteFile'
import { useParams } from 'react-router-dom'


export function AdminAccountPage() {
    const {adminId} = useParams()
    const [fileList, setFileList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const menuList = [
        {title: 'Мои файлы', path: `/admin/${adminId}`},
        {title: 'Управление пользователями', path: `/admin/${adminId}/users`}
     ]

    const handleRefresh = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/files/?user_id=${adminId}`)
            // console.log(response.data)
            setFileList(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Ошибка при обновлении списка файлов:', error)
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
                    <ListMenu menuList={menuList}/>
                    {isLoading && <div>Загрузка файлов...</div>}
                    <FormFileUploader onSuccess={handleRefresh}/>
                    <FileList fileList={fileList} onRefresh={handleRefresh} onDelete={handleFileDelete}/>
        </div>
    )
}