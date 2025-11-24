import { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import S from './EntryForm.module.css'
import { useNavigate } from 'react-router-dom'
import { loginFunction } from '../../api/api'


export function EntryForm({submitText}) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const navigate = useNavigate()

    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        // console.log({login}, {password})
        try {
            const response = await loginFunction({
                login: login,  
                password: password
            });

            navigate(`/profile/${response.user.id}`);
        } catch (err) {
            if (err.message === 'Неверные логин или пароль') {
                setError('Неверные логин или пароль');
            } else {
                setError('Произошла ошибка при авторизации');
            }
            console.error('Ошибка при авторизации:', err);
        }
    }

    return(
        <form className={S.formRegistr} onSubmit={handleSubmit}>
                <div className={S.inscription}>Логин</div>
                <Input value={login} onChange={(e)=> setLogin(e.target.value)}/>
                <div className={S.label}>Введите логин</div>
                <div className={S.inscription}>Пароль</div>
                <Input value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className={S.label}>Введите пароль</div>
                <Button type={'submit'} title={submitText} />
        </form>
    )
}