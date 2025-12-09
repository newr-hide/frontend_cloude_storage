import S from './UserCard.module.css'
import DeleteIcon from '@mui/icons-material/Delete'

export function UserCard({id, login, email}) {
    return(
        <div className={S.card}>
            <tr>
                <td>{login}</td>
                <td>{email}</td>
                <td>
                    <a href="#">files</a>
                </td>
            </tr>
            <form action="">
                <button>Добавить права Администратора</button>
                <button>Убрать права Администратора</button>
                <button title={<DeleteIcon/>}>Удалить</button>
            </form>
            
        </div>
    )
}
