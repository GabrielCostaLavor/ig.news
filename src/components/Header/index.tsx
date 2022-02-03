import { SingInButton } from './SingInButton'
import styleClass from './style.module.scss'

export function Header(){
    return(
        <header className={styleClass.header}>
            <div className={styleClass.headerContainer + ` container`} >
                <div className={styleClass.LogoMenu}>
                    {/**Toda vez que eu por apenas (/) vai para a pasta public */}
                    <img src="/imagens/ig.news.svg" alt="" />
                </div>
                <nav>
                    <a href="#" className={styleClass.active}>Home</a> 
                    <a href="#">Posts</a>
                </nav>
                <div className={styleClass['sing-in-header']}>
                    <SingInButton />
                </div>
            </div>
        </header>
    )
}