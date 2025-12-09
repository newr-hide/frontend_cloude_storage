import { MenuItem } from '../MenuItem/MenuItem'
import S from './ListMenu.module.css'



export function ListMenu({menuList}) {
    if (!Array.isArray(menuList) || menuList.length === 0) {
        return null;
    }
    return (
        <ol className={S.listMenu}>
            {menuList.map((menuItem) => (
                <li key={menuItem.title} className={S.listItem}>
                    <MenuItem label={menuItem.title} path={menuItem.path}/>
                </li>
            ))}
        </ol>
    );
}