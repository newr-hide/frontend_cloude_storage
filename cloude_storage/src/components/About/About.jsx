import { LinkBack } from '../LinkBack/LinkBack'
import S from './About.module.css'


export function About() {
    return(
        <div className={S.global}>
            <LinkBack className={S.link}/>
           <p className={S.content}>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Possimus, harum ipsam! Soluta porro ipsam ab deleniti animi voluptatum,
              quod inventore tenetur dolorem,
               vero eaque doloribus eius iusto placeat saepe laudantium.

               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Possimus, harum ipsam! Soluta porro ipsam ab deleniti animi voluptatum,
              quod inventore tenetur dolorem,
               vero eaque doloribus eius iusto placeat saepe laudantium.
            </p> 
        </div>
    )
}