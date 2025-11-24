import S from './AccountForm.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserInfo } from '../../api/userService'
import { api } from '../../api/api'
export function AccountForm({ submitText }) {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!userId) {
                    throw new Error('ID пользователя не указан');
                }
                
                setLoading(true);

                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Токен отсутствует');
                }
                
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                

                const response = await getUserInfo(userId);
                // console.log(response)
                setUserInfo(response);
                
            } catch (err) {
                console.error('Ошибка данных:', err);
                setError('Ошибка получения данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);
    const handleLogout = () => {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_login')
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
            
            <Button title={submitText} logoutAccount={handleLogout}/>
        </form>
    );
}