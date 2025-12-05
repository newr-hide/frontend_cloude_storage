import S from './RegistrationForm.module.css'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { useState } from 'react'
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';

export function RegistrationForm({submitText}) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()



    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        
        try {
            const validationErrors = []
            if (!validateLogin(login)) {
                validationErrors.push('Неверный формат логина')
            }
            if (!validateEmail(email)) {
                validationErrors.push('Неверный формат email')
            }
            if (!validatePassword(password)) {
                validationErrors.push('Неверный формат пароля')
            }
            if (validationErrors.length > 0) {
                setError(validationErrors.join('\n'))
                return
            }
            try {
                const response = await register(
                    {
                        login,
                        email,
                        password
                    }
                )
                // console.log('Ответ сервера:', response);
                
                if (!response || !response.tokens || !response.user) {
                    throw new Error('Неверный ответ от сервера');
                }
                
                const { access, refresh } = response.tokens;
                const { id } = response.user;
                localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('access_token', access);
                localStorage.setItem('user_id', id);
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                navigate(`/profile/${id}`)
                
            } catch (error) {
                console.log(error)
            }
             


        } catch (error) {
            setError('Произошла ошибка при регистрации');
            console.error('Ошибка регистрации:', error);
        }
    };

    const validateLogin = (login) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
        return regex.test(login);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    return(
        <form className={S.form} onSubmit={handleSubmit}>
            
            {error && <div className={S.error}>{error}</div>}
            <div className={S.inscription}>Введите ваш Логин</div>
            <Input className={S.input} value={login} onChange={(e)=> setLogin(e.target.value)}/>
            <div className={S.label}> Только латинские буквы и цифры,
                 первый символ — буква, длина от 4 до 20 символов
            </div>
            <div className={S.inscription}>Введите ваш действующий e-mail</div>
            <Input className={S.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className={S.inscription}>Ведите ваш пароль</div>
            <Input className={S.input} value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <div className={S.label}>Не менее 6 символов: как минимум одна заглавная буква,
                 одна цифра и один специальный символ
            </div>
            <Button type={'submit'} title={submitText}/>
        </form>
    )
}