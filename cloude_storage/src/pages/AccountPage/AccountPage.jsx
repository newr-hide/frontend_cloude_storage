import { AccountForm } from '../../components/AccountForm/AccountForm'
import { Button } from '../../components/Button/Button'
import { FormFileUploader } from '../../components/FormFileUploader/FormFileUploader'
import { UserFile } from '../../components/UserFile/UserFile'
import S from './AccountPage.module.css'


export function AccountPage() {
    return(
        <div className={S.global}>
            <AccountForm submitText={'Выйти'}/>
            <h2 className={S.title}>Мои документы</h2>
            <FormFileUploader/>
            
            <div className={S.listDocument}>
                <div className={S.titleList}>
                    <div className={S.label}>Название</div>
                    <div className={S.label}>Комментарий</div>
                    <div className={S.label}>Размер</div>
                    <div className={S.label}>Дата Загрузки</div>
                    <div className={S.label}>Дата последнего скачивания</div>
                </div>
                <UserFile/>
                <UserFile/>
                <UserFile/>
                <UserFile/>
                <UserFile/>
            </div>
        
        </div>
    )
}