import S from './MenuItem.module.css'


export function MenuItem({label, path}) {
    return(
        <a className={S.linkItem} href={path}>{label}</a>
    )
}