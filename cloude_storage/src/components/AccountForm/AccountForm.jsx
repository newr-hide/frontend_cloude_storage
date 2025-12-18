import S from './AccountForm.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserInfo } from '../../api/userService'
import { api } from '../../api/api'

export function AccountForm({ submitText }) {
    const { userId, adminId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    // console.log(userId)
    const id = userId || adminId
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!id) {
                    throw new Error('ID пользователя не указан');
                }
                
                setLoading(true);  

                const response = await getUserInfo(id);
                 console.log(response)
                setUserInfo(response);
                
            } catch (err) {
                console.error('Ошибка данных:', err);
                setError('Ошибка получения данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserInfo();
        }
    }, [id]);
    const handleLogout = () => {
        
        navigate('/',{ replace: true })
    }
    return (
        <form className={S.form}>
            {loading && <div className={S.label}>Загрузка...</div>}
            {error && <div className={S.error}>{error}</div>}
            
            {userInfo && (
                <div>
                    <div className={S.label}>
                        <strong>Логин:</strong> {userInfo.login}
                    </div>
                    <div className={S.label}>
                        <strong>Email:</strong> {userInfo.email}
                    </div>
                </div>
            )}
            
            <Button title={submitText} onClick={handleLogout}/>
        </form>
    );
}