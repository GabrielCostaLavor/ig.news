import styleClass from './style.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import { signIn, useSession, signOut } from "next-auth/client"

export function SingInButton(){
    const [session] = useSession();
    console.log(session)
    return session  ? (
        <button className={styleClass.buttonSingIn}>
            <FaGithub className={styleClass.logged}/>
            <span>{session.user.name}</span>
            <FiX onClick={() => signOut()} className={styleClass.iconClose} />
        </button>
    ) : (
        <button className={styleClass.buttonSingIn} onClick={() => {signIn('github')}}>
            <FaGithub className={styleClass.notLogged}/>
            <span>Sing in with GitHub</span>
        </button>
    )
}