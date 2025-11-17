import S from './AccountForm.module.css'
import { Button } from '../Button/Button'
import { useEffect, useState } from 'react'

export function AccountForm({submitText}) {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')

    useEffect( () => {
    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/:id')
            
            const data = await response.json()
            console.log(data)
            setLogin(data.login)
            setEmail(data.email)
        } catch (error) {
            console.error('Ошибка данных:', error);
        }}
    fetchUserInfo()
    }, [])

    return(
        <form className={S.form}>
            <div className={S.label}>{login || 'Загрузка'}</div>
            <div className={S.label}>{email || 'Загрузка'}</div>
            <Button title={submitText} />
        </form>
    )
}