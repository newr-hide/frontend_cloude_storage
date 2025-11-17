import { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import S from './EntryForm.module.css'


export function Form({submitText}) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (event) =>{
        event.preventDefault()
        // console.log({login}, {password})
    }

    return(
        <form className={S.formRegistr} onSubmit={handleSubmit}>
                <div className={S.inscription}>Логин</div>
                <Input value={login} onChange={(e)=> setLogin(e.target.value)}/>
                <div className={S.label}>Введите логин</div>
                <div className={S.inscription}>Пароль</div>
                <Input value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className={S.label}>Введите пароль</div>
                <Button type={'submit'} title={submitText}/>
        </form>
    )
}