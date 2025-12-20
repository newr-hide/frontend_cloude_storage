import S from './AccountForm.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../../api/userService'


export function AccountForm({ submitText, userId}) {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const previousUserIdRef = useRef()
    // console.log(userId)
    
    useEffect(() => {
        console.log('Запуск запроса для userId:', userId)
        const fetchUserInfo = async () => {
            try {
                if (!userId) {
                    throw new Error('ID пользователя не указан');
                }
                
                setLoading(true);  

                const response = await getUserInfo(userId);
                //  console.log(response)
                setUserInfo(response);
                
            } catch (err) {
                console.error('Ошибка данных:', err);
                setError('Ошибка получения данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            if (userId !== previousUserIdRef.current) {
                fetchUserInfo()
                previousUserIdRef.current = userId
            }
        }
    }, [userId])
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