import S from './UserFile.module.css'


export function UserFile({
    name,
    comment,
    size,
    dateLoading,
    dateDownload,
}) {
    //Для получения названия файла из БД
    const getFileName = (fullPath) => {
        const fileName = fullPath.split('/').pop()
        return decodeURIComponent(fileName) //decode это чтобы русский язык принимал

    }
    return(
        <div className={S.document}>
            <tr>
                <td>{getFileName(name)}</td>
                <td>{comment}</td>
                <td>{size}</td>
                <td>{dateLoading}</td>
                <td>{dateDownload}</td>
            </tr>
            {/* <div className={S.nameFile}>{getFileName(name)}</div>
            <div className={S.comment}>{comment}</div>
            <div className={S.size}>{size}</div>
            <div className={S.dateLoading}>{dateLoading}</div>
            <div className={S.dateDownload}>{dateDownload}</div> */}
            <form action="">
                <button>Скачать</button>
                <button>Просмотр</button>
                <button>Поделиться</button>
                <button>Удалить</button>
            </form>
        </div>
    )
}