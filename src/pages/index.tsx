import Head from 'next/head'
import Image from 'next/image'
import { ButtonSubiscribe } from '../components/ButtonSubscribe'
import styleClass from "./home.module.scss"

export default function Home() {
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
                <p>Get acess to all the publications <span>for $9,90 month</span></p>
            </div>
            <ButtonSubiscribe />
        </div>
        <div className={styleClass.subscribeImg}>
            <img src="/imagens/Mulher.svg" alt="" />
        </div>
    </section>
  </main>
  </>
  )
}
