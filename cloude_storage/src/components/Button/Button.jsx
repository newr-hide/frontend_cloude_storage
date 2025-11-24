import S from './Button.module.css'


export function Button({title, logoutAccount}) {
    return(
        <button className={S.btn} onClick={logoutAccount}>{title}</button>
    )
}