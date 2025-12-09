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
        setError('')
        try {
            const {token, user} = await loginFunction({
                login: login,  
                password: password
            });

            localStorage.setItem('token', token);
            if (user.is_admin) {
                // console.log(user)
                navigate(`/admin/${user.id}`);
            } else {
                // console.log(user)
                navigate(`/profile/${user.id}`);
            }
        } catch (err) {
            if (err.message === 'Неверные логин или пароль') {
                setError('Неверные логин или пароль');
            } else {
                setError('Произошла ошибка при авторизации');
            }
            console.error('Ошибка при авторизации:', err);
        }
    };

    return(
        <form className={S.formRegistr} onSubmit={handleSubmit}>
            {error && <div className={S.error}>{error}</div>}
                <div className={S.inscription}>Логин</div>
                <Input value={login} onChange={(e)=> setLogin(e.target.value)} className={error ? S.errorInput : ''}/>
                <div className={S.label}>Введите логин</div>
                <div className={S.inscription}>Пароль</div>
                <Input value={password} type='password' onChange={(e) => setPassword(e.target.value)} className={error ? S.errorInput : ''}/>
                <div className={S.label}>Введите пароль</div>
                <Button type={'submit'} title={submitText} />
        </form>
    )
}