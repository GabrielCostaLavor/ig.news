import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../service/stripe";
import { getSession } from 'next-auth/client'
import { fauna } from "../../service/faunadb";
import { query as q} from "faunadb";
import { type } from "os";

type User ={
    ref :{
        id: string
    }
    data:{
        stripe_customer_id: string
    }
}

export default async (req: NextApiRequest, respo: NextApiResponse) => {
    //Verifica se o methodo usado na requisição é o POST, se não vai exibir um erro ao publicar o pagamento
    if(req.method === 'POST'){
        const session = await getSession({ req }); 
        //Estou pegando os dados do usuario do meu banco de dados fauna
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )
        console.log(session)
        let customerId = user.data.stripe_customer_id;

        if(!customerId){
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email
    
            })
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'),user.ref.id),
                    {
                        data:{
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )    
            customerId = stripeCustomer.id
        }
        //console.log(stripeCustumers)

        //Para criar uma sessão de pagamento
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            //Metodos de pagamento
            payment_method_types: ['card'],
            //Dar obrigatoriedade pro cliente preencher o endereço, AUTO o proprio stripe lida com isso, REQUIRED eu posso lidar com isso
            billing_address_collection: "required",
            //Itens que o cliente vai ver do produto, preço e quantidade
            line_items: [
                {
                    price: 'price_1KPBCbImtPtyqdXvHHx1RADf',
                    quantity: 1
                }
            ],
            //Para dizer que o modo de pagamento é recorrente
            mode: "subscription",
            //Permite exibir codigos de promoção
            allow_promotion_codes: true,
            //Caso pagamento seja um sucesso
            success_url: process.env.SUCCESS_URL,
            //Caso o pagamento falhe
            cancel_url: process.env.CANCEL_URL,
        })
        return respo.status(200).json({sessionId: checkoutSession.id})
    }
    else{
        respo.setHeader('Alow', 'POST')
        respo.status(405).end('Method not allowed')
    }
}
