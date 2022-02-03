import Document, {Html, Head, Main, NextScript} from "next/document";

//Maneira de definir uma class
export default class MyDocument extends Document{
    //Função para renderizar o html
    render(){
        return(
            //Esse Html é um Componente do document
            <Html>
                {/**Head é um componente que eu posso por informações dentro dele em outras paginas diferentes, tipo mudar o title de acordo com a pagina*/}
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    {/**O conteudo do main vai mudar de acordo com a rota da pagina e o que eu por dentro dela, ele é um componente */}
                    <Main />
                    {/**Vai rodar os javascript */}
                    <NextScript />
                </body>
            </Html>
        )
    }
}