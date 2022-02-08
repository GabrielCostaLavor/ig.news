import styleClass from './style.module.scss'
import {useSession, singIn} from 'next-auth/client'
import { api } from '../../service/api';
import { getStripeJs } from '../../service/stripe-js';

interface ButtonSubProps{
    priceId: string,
}
export function ButtonSubiscribe({priceId} : ButtonSubProps){
    //verificando situação do usuario
    const [ session ] = useSession();
    //Função para realizar a inscrição
    async function subscribe(){
        //Se o usuario não extive logado ele vai para a parte de login
        if(!session){
            singIn('github')
            return;
        }
        //console.log(session)
        //Chamando a api que vai criar o pagamento

        try {
            //Ta usandondo o methodo post para publicar na api subscribe
            const response = await api.post('/subscribe')

            const {  sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        } catch (error) {
            alert(error.message)
        }

    }
    return <button className={styleClass.buttonSubscribe} onClick={subscribe}>Subscribe now</button>
}