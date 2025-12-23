
import S from './UsersList.module.css'
import { getUsers } from '../../api/getUsers'
import { useState, useEffect, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '../Button/Button'
import {deleteUser} from '../../api/deleteUser'
import { useParams } from 'react-router-dom'
import { updateUserAdminStatus } from '../../api/updateUser'
import { getUserFiles } from '../../api/getUserFiles'


export function UsersList() {
    const [users, setUsers] = useState([])
    const {adminId} = useParams()
    const [loading, setLoading] = useState(true)
    const parsedAdminId = parseInt(adminId, 10)
    const [fileStats, setFileStats] = useState({})

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const data = await getUsers()
                const filteredUsers = data.filter(user => user.id !== parsedAdminId)
                setUsers(filteredUsers)
                
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }}
        fetchUsers()
    },[])


    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Б'
        const k = 1024
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
    }

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Вы уверены, что хотите удалить пользователя?')) {
            return  
        }
        try {
            await deleteUser(userId)
            const updatedUsers = users.filter(user => user.id !== userId)
            setUsers(updatedUsers)

            console.log('Пользователь удален');
        } catch (error) {
            console.error(error)
        }
    }

    const handleToggleAdmin = async (userId, currentIsAdmin) => {
        try {
            // Отправляем противоположное значение
            const newIsAdmin = !currentIsAdmin;
            await updateUserAdminStatus(userId, newIsAdmin);
            
            // Обновляем состояние
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    return { ...user, is_admin: newIsAdmin };
                }
                return user;
            });
            setUsers(updatedUsers);
            
            const message = newIsAdmin 
                ? 'Пользователь назначен администратором' 
                : 'Администраторские права сняты'
            alert(message);
        } catch (error) {
            console.error(error);
            alert('Ошибка при обновлении статуса администратора');
        }
    };
    // console.log(users)
    return(
        <div>
            {loading && <div>Загрузка...</div>}
            <h2 className={S.title}>Список пользователей:</h2>
            <table className={S.listDocument}>
                <thead className={S.titleList}>
                    <tr>
                        <th className={S.label}>Пользователи</th>
                        <th className={S.label}>E-mail</th>
                        <th className={S.label}>Файлы пользователя</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    const stats = fileStats[user.id] || { count: 0, size: '0 Б' }
                    return(
                    <tr key={user.id}>
                    <td className={S.label}>{user.login}</td>
                    <td className={S.label}>{user.email}</td>
                    <td ><a className={S.label} href={`${user.id}/files`}>
                        <div>
                            <div>Файлы пользователя</div><br/>
                            <div>
                                <span>Количество: {user.total_files} </span><br/>
                                <span>Объем: {formatBytes(user.total_size)}</span>
                            </div>
                            </div></a>
                    </td>
                    <td><form action="">
                    <Button onClick={() => handleToggleAdmin(user.id, user.is_admin)}
                                    title={user.is_admin ? 'Убрать Админа' : 'Сделать Админом'}/>
                    <Button onClick={() => handleDeleteUser(user.id)} className={S.btn} title={<DeleteIcon/>}/>
                    </form></td>
                    </tr>
                    
)})}
                </tbody>
            </table>
        </div>
    )
}

