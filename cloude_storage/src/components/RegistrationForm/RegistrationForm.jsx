import S from './RegistrationForm.module.css'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { useState } from 'react'
import { register } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export function RegistrationForm({submitText}) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Валидация входных данных
        try {
            if (!validateLogin(login)) {
                throw new Error('Неверный формат логина');
            }
            if (!validateEmail(email)) {
                throw new Error('Неверный формат email');
            }
            if (!validatePassword(password)) {
                throw new Error('Неверный формат пароля');
            }
    
             await register({
                login,
                email,
                password
            });

            navigate('/profile')
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