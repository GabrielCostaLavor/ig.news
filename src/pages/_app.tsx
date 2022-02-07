import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
    <Header />
    <NextAuthProvider session={pageProps.session} >
     <Component {...pageProps} />
    </NextAuthProvider>  
    </>
  )
}

export default MyApp
