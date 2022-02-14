import { SingInButton } from './SingInButton'
import styleClass from './style.module.scss'
//Dependencia pros meus links não ficarem recarregando a pagina, a funcionalidade do next que faz com que as paginas não fiquem recarregndo tudo
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header(){
    //Mostra a rota que ta sendo acessada
    const {asPath} = useRouter()
    console.log(asPath)
    return(
        <header className={styleClass.header}>
            <div className={styleClass.headerContainer + ` container`} >
                <div className={styleClass.LogoMenu}>
                    {/**Toda vez que eu por apenas (/) vai para a pasta public */}
                    <img src="/imagens/ig.news.svg" alt="" />
                </div>
                <nav>
                    
                    {/*Basta por o Link ao redor do meu a e por o href nele*/}
                    <Link href="/">
                    <a className={asPath === '/' ? styleClass.active : ''}>Home</a> 
                    </Link>
                    {/*PREFETCH assim que vc entrar no site essa pagina onde tem o prefetch já vai ser pre carregada deixando mais rapida a exibição*/}
                    <Link href="/posts" prefetch>
                    <a className={asPath === '/posts' ? styleClass.active : ''}>Posts</a>
                    </Link>
                </nav>
                <div className={styleClass['sing-in-header']}>
                    <SingInButton />
                </div>
            </div>
        </header>
    )
}