import S from './AdminUsersPage.module.css'
import { AccountForm } from '../../components/AccountForm/AccountForm'
import { ListMenu } from '../../components/ListMenu/ListMenu'
import { UsersList } from '../../components/UsersList/UsersList'
import { useParams } from 'react-router-dom'


export function AdminUsersPage() {
    const {adminId} = useParams()
    const menuList = [
            {title: 'Мои файлы', path: `/admin/${adminId}`},
            {title: 'Управление пользователями', path: `/admin/${adminId}/users`}
            ]
    return(
        <div className={S.global}>
                    <AccountForm submitText={'Выйти'}/>
                    <ListMenu menuList={menuList}/>
                    <UsersList/>
        </div>
    )

}