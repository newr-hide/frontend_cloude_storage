import S from './Home.module.css'
import { ListMenu } from '../../components/ListMenu/ListMenu'
import { LinkRegistration } from '../../components/LinkRegistration/LinkRegistration'
import { EntryForm } from '../../components/EntryForm/EntryForm'

export function Home() {
    return(
       
        <div className={S.container}>
            <ListMenu/>
            <LinkRegistration/>
            <EntryForm submitText={'Войти'}/>
        </div> 
        
        
    )
}