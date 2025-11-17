import S from './Button.module.css'


export function Button({title}) {
    return(
        <button className={S.btn}>{title}</button>
    )
}