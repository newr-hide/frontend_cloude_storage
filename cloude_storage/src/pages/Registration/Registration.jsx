
import { LinkBack } from '../../components/LinkBack/LinkBack'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'
import S from './Registration.module.css'


export function Registration() {
    return(
        <div className={S.global}>
            <h2 className={S.title}>Регистрация нового пользователя</h2>
            <LinkBack/>
            <RegistrationForm submitText={'Зарегистрироваться'}/>
        </div>
    )
}