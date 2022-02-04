//Arquivo que vai definir a conexão com o a api do stripe
//Biblioteca para lidar com a api do stripe
import Stripe from "stripe";

//Essa biblioteca vai precisar de dois parametros, a chave da api e algumas informações essenciais
export const stripe = new Stripe(
    //Vai receber a chave da api, uso o process.env.VARIAVEL_COM_API pra pegar a variavel que tem a chave lá do .env.local
    'sk_test_51KPBAQImtPtyqdXvh9tjoS6kgIfTxKBY2jfHvPcbcCG98APThGfyQPNYfKfTmuQdX8K2U1j8BPDbAJ3Qg4hV8C3x00hZTpvpUk',
    //
    {
        //CTRL + SPACE para mostrar os valores que eu posso por e que se espera
        //Verção da api
        apiVersion: "2020-08-27",
        //Informações do projeto
        appInfo: {
            name: 'ignews',
            version: '0.1.0'
        }
    }
)