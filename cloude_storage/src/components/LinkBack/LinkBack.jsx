import S from './LinkBack.module.css'


export function LinkBack({className}) {
    return(
        <a href="/" className={`${S.inscription}  ${className || ''}`}>Назад</a>
    )
}