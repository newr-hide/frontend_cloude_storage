import { AccountForm } from '../../components/AccountForm/AccountForm'
import { Button } from '../../components/Button/Button'
import S from './AccountPage.module.css'


export function AccountPage() {
    return(
        <div className={S.global}>
            <AccountForm submitText={'Выйти'}/>
            <h2 className={S.title}>Мои документы</h2>
            <div className={S.listDocument}>
                <div className={S.titleList}>
                    <div className={S.label}>Название</div>
                    <div className={S.label}>Комментарий</div>
                    <div className={S.label}>Размер</div>
                    <div className={S.label}>Дата Загрузки</div>
                    <div className={S.label}>Дата последнего скачивания</div>
                </div>
                <div className={S.document}>
                    <div className={S.nameFile}>dgfhgfhfgh</div>
                    <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                    <div className={S.size}>42</div>
                    <div className={S.dateLoading}>12.12.2025</div>
                    <div className={S.dateDownload}>25.12.2025</div>
                </div>
                <div className={S.document}>
                    <div className={S.nameFile}>dgfhgfhfgh</div>
                    <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                    <div className={S.size}>42</div>
                    <div className={S.dateLoading}>12.12.2025</div>
                    <div className={S.dateDownload}>25.12.2025</div>
                </div>
                <div className={S.document}>
                    <div className={S.nameFile}>dgfhgfhfgh</div>
                    <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                    <div className={S.size}>42</div>
                    <div className={S.dateLoading}>12.12.2025</div>
                    <div className={S.dateDownload}>25.12.2025</div>
                </div>
                <div className={S.document}>
                    <div className={S.nameFile}>dgfhgfhfgh</div>
                    <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                    <div className={S.size}>42</div>
                    <div className={S.dateLoading}>12.12.2025</div>
                    <div className={S.dateDownload}>25.12.2025</div>
                </div>
                <div className={S.document}>
                    <div className={S.nameFile}>dgfhgfhfgh</div>
                    <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                    <div className={S.size}>42</div>
                    <div className={S.dateLoading}>12.12.2025</div>
                    <div className={S.dateDownload}>25.12.2025</div>
                </div>
            </div>
        
        </div>
    )
}