import S from './Home.module.css'
import { ListMenu } from '../../components/ListMenu/ListMenu'
import { LinkRegistration } from '../../components/LinkRegistration/LinkRegistration'
import { EntryForm } from '../../components/EntryForm/EntryForm'

export function Home() {
    const menu = [
        { title: 'Главная', path: '/' },
        { title: 'О нас', path: '/about' }
]
    return(
       
        <div className={S.container}>
            <ListMenu menuList={menu}/>
            <LinkRegistration/>
            <EntryForm submitText={'Войти'}/>
        </div> 
        
        
    )
}