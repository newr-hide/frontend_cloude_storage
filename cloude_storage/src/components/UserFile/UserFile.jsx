import S from './UserFile.module.css'


export function UserFile({
    name,
    comment,
    size,
    dateLoading,
    dateDownload,
}) {

    
    return(
        <div className={S.document}>
            <tr>
                <td>{name}</td>
                <td>{comment}</td>
                <td>{size}</td>
                <td>{dateLoading}</td>
                <td>{dateDownload}</td>
            </tr>
            <form action="">
                <button>Скачать</button>
                <button>Просмотр</button>
                <button>Поделиться</button>
                <button>Удалить</button>
            </form>
        </div>
    )
}