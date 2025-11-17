import S from './Input.module.css'


export function Input({onChange, className, ...restProps}) {
    return(
        <input {...restProps} className={`${S.inputRegistr}  ${className || ''}`} onChange={onChange} type="text"/>
    )
}