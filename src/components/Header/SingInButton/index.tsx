import styleClass from './style.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
export function SingInButton(){
    const isUserLoggedIn = false;

    function iconClose(){
        
    }
    
    return isUserLoggedIn ? (
        <button className={styleClass.buttonSingIn}>
            <FaGithub className={styleClass.logged}/>
            <span>Nome do usuario</span>
            <FiX className={styleClass.iconClose} onClick={iconClose}/>
        </button>
    ) : (
        <button className={styleClass.buttonSingIn}>
            <FaGithub className={styleClass.notLogged}/>
            <span>Sing in with GitHub</span>
        </button>
    )
}