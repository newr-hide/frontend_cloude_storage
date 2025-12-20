
import S from './UsersList.module.css'
import { getUsers } from '../../api/getUsers'
import { useState, useEffect, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '../Button/Button'
import {deleteUser} from '../../api/deleteUser'
import { useParams } from 'react-router-dom'
import { updateUserAdminStatus } from '../../api/updateUser'


export function UsersList() {
    const [users, setUsers] = useState([])
    const {adminId} = useParams()
    const [loading, setLoading] = useState(true)
    const parsedAdminId = parseInt(adminId, 10)

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
            }
            
        }
        fetchUsers()
    },[])

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
                {users.map((user) => (
                    <tr key={user.id}>
                    <td className={S.label}>{user.login}</td>
                    <td className={S.label}>{user.email}</td>
                    <td ><a className={S.label} href={`${user.id}/files`}>Файлы пользователя</a></td>
                    <td><form action="">
                    <Button onClick={() => handleToggleAdmin(user.id, user.is_admin)}
                                    title={user.is_admin ? 'Убрать Админа' : 'Сделать Админом'}/>
                    <Button onClick={() => handleDeleteUser(user.id)} className={S.btn} title={<DeleteIcon/>}/>
                    </form></td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </div>
    )
}

