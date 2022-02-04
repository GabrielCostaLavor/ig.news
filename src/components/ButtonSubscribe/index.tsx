import styleClass from './style.module.scss'

interface ButtonSubProps{
    priceId: string,
}
export function ButtonSubiscribe({priceId} : ButtonSubProps){
    return <button className={styleClass.buttonSubscribe}>Subscribe now</button>
}