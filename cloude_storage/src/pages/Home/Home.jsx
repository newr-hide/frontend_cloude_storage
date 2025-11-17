import S from './Home.module.css'
import { ListMenu } from '../../components/ListMenu/ListMenu'
import { LinkRegistration } from '../../components/LinkRegistration/LinkRegistration'
import { Form } from '../../components/EntryForm/EntryForm'

export function Home() {
    return(
       
        <div className={S.container}>
            <ListMenu/>
            <LinkRegistration/>
            <Form submitText={'Войти'}/>
        </div> 
        
        
    )
}