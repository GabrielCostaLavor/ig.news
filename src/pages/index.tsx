import Head from 'next/head'
import Image from 'next/image'
import { ButtonSubiscribe } from '../components/ButtonSubscribe'
import styleClass from "./home.module.scss"
import { GetServerSideProps } from 'next'
import { stripe } from '../service/stripe'

interface PropsStripe{
  product:{
    priceId: string,
    amount: number
  }
}

export default function Home({product} : PropsStripe) {
  return (
  <>
  <Head>
    <title>Inicio | ig.news</title>
  </Head>
  <main>
    <section className={styleClass.mainContainerSubscribe + ` container`}>
        <div className={styleClass.subscribeContent}>
            <h1><img src="/imagens/image 351.png" alt="" /> Hey, welcome</h1>
            <div className={styleClass.subscribeText}>
                <h1>News about the <span>React</span> world</h1>
                <p>Get acess to all the publications <span>for {product.amount} month</span></p>
            </div>
            <ButtonSubiscribe priceId={product.priceId}/>
        </div>
        <div className={styleClass.subscribeImg}>
            <img src="/imagens/Mulher.svg" alt="" />
        </div>
    </section>
  </main>
  </>
  )
}

//Esse é o padrão pra usar o servidor do next DEIXAR SEMPRE ASSIM
//Servidor roda no terminal e não no browser
//Esse é o metodo SSR, onde que os dados vão estar em um servidor next, tudo que fica aqui não roda no browser, roda apenas no servidor, você tem que requisitar na pagina(A função acima) pra rodar no browser
export const getServerSideProps: GetServerSideProps = async() => {

  //Tô pegando o preço, stripe é a cont que ta no service/stripe,
  //o price é uma tabela que ta no stripe, o retrive é quando é um só
  const price = await stripe.prices.retrieve('price_1KPBCbImtPtyqdXvHHx1RADf', {
    //Esse expend me permite retornar todas as informações da tabela que tiver entre [], no caso são todas as informações do produto
    //Não necessario, apenas para pegar todos os dados da tabela product
    expand: ['product']
  })

  //Essa const tá pegando os valores da tabela
  const product = {
    priceId: price.id,
    //preço do produto inteiro, ele vem em centavos então dividir por 100 o deixa inteiro
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  };

  console.log(product)
  return {
    //Props é um atributo da função que vai retornar tudo que botar nele como parametro
    props: {
      product
    }
  }
}