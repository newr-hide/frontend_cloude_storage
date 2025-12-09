import { UserCard } from '../UserCard/UserCard'
import S from './UsersList.module.css'
import { getUsers } from '../../api/getUsers'
import { useState, useEffect } from 'react'
import { getUserFiles } from '../../api/getUserFiles'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '../Button/Button'

export function UsersList() {
    const [users, setUsers] = useState([])
    const [selectedUserFiles, setSelectedUserFiles] = useState(null)
    const [showFiles, setShowFiles] = useState(false)

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const data = await getUsers()
                
                setUsers(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsers()
    },[])

    const handleFilesClick = async (userId) => {
        try {
            const files = await getUserFiles(userId);
            setSelectedUserFiles(files);
            setShowFiles(true);
        } catch (error) {
            console.error(error);
        }
    };
    // console.log(users)
    return(
        <div>
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
                    <Button title={'Сделать Админом'}/>
                    <Button title={'Убрать Админа' }/>
                    <Button className={S.btn} title={<DeleteIcon/>}/>
                    </form></td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </div>
    )
}

