import S from './UserFilePage.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { FileList } from '../../components/FileList/FileList';
import { api } from '../../api/api';
import { Button } from '../../components/Button/Button';
import { deleteFile } from '../../api/deleteFile'; 

export function UserFilePage() {
    const { userId, adminId } = useParams();
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                if (!userId || !adminId) {
                    throw new Error('Недостаточно параметров для загрузки файлов');
                }
                setIsLoading(true);
                const userResponse = await api.get(`/users/${userId}`);
                setUser(userResponse.data);
                const response = await api.get(`/admin/users/${userId}/files/`);
                setFileList(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при получении файлов:', error);
                setIsLoading(false);
            }
        };

            fetchFiles();
        
    }, [userId, adminId]);

    const handleFileDelete = async (fileId) => {
        if (window.confirm('Вы уверены, что хотите удалить файл?')) {
            try {
                await deleteFile(fileId);
                // Перезагружаем список файлов
                const response = await api.get(`/files/?user_id=${userId}`);
                setFileList(response.data);
            } catch (error) {
                console.error('Ошибка при удалении файла:', error);
            }
        }
    };
    const handleBackClick = () => {
        navigate(`/admin/${adminId}/users`);
    };
    return (
        <div className={S.global}>
            <Button title={'Назад'} onClick = {handleBackClick} />
            {isLoading && <div className={S.label}>Загрузка файлов...</div>}
            {user && (
                <div>
                    <h2 className={S.title}>Файлы пользователя:  {user.login}</h2>
                    <FileList 
                        fileList={fileList} 
                        onDelete={handleFileDelete} 
                    />
                </div>
            )}
        </div>
    );
}