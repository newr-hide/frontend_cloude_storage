import S from './UserFile.module.css'


export function UserFile(props) {
    return(
        <div className={S.document}>
                            <div className={S.nameFile}>dgfhgfhfgh</div>
                            <div className={S.comment}>dfgdf dfgdfg dfgdf gdfgdf dfgdf dfgdf dfgdfg</div>
                            <div className={S.size}>42</div>
                            <div className={S.dateLoading}>12.12.2025</div>
                            <div className={S.dateDownload}>25.12.2025</div>
                            <form action="">
                                <button>Скачать</button>
                                <button>Просмотр</button>
                                <button>Поделиться</button>
                                <button>Удалить</button>
                            </form>
                        </div>
    )
}