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
                    <div className="homeMenu"><a href="#">Home</a></div>
                    <div className="postsMenu"><a href="#">Posts</a></div>
                </nav>
                <div className={styleClass['sing-in-header']}>
                        <button>
                            <img src="/imagens/Github.png" alt="" />
                            <span>Sing in with GitHub</span>
                        </button>
                </div>
            </div>
        </header>
    )
}