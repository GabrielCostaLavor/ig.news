import styleClass from './style.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import { signIn, useSession } from "next-auth/client"

export function SingInButton(){
    const [session] = useSession();
    
    return session  ? (
        <button className={styleClass.buttonSingIn}>
            <FaGithub className={styleClass.logged}/>
            <span>Nome do usuario</span>
            <FiX className={styleClass.iconClose} />
        </button>
    ) : (
        <button className={styleClass.buttonSingIn} onClick={() => {signIn('github')}}>
            <FaGithub className={styleClass.notLogged}/>
            <span>Sing in with GitHub</span>
        </button>
    )
}