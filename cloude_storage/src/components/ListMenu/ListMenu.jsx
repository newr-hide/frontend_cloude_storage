import { MenuItem } from '../MenuItem/MenuItem'
import S from './ListMenu.module.css'

const menu = [
        { title: 'Главная', path: '/' },
        { title: 'Файлы', path: '/files' },
        { title: 'О нас', path: '/about' }
]

export function ListMenu() {
    return (
        <ol className={S.listMenu}>
            {menu.map((menuItem) => (
                <li key={menuItem.title} className={S.listItem}>
                    <MenuItem label={menuItem.title} path={menuItem.path}/>
                </li>
            ))}
        </ol>
    );
}