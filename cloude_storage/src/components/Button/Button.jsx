import S from './Button.module.css'


export function Button({title, onClick, className}) {
    return(
        <button className={`${S.btn}  ${className || ''}`} onClick={onClick}>{title}</button>
    )
}