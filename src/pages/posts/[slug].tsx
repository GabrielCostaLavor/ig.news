import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/client'
import Head from "next/head";
import styleClass from './pagePost.module.scss'
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../service/prismic";

interface pagePostsProps{
    post : {
        slug: string,
        title: string,
        content: string,
        updateAt: string,
    }
}
export default function Post({post} : pagePostsProps){
    return(
        <>
        <Head>
            <title>{post.title} || ignews</title>
        </Head>
        <main className={styleClass.postPageContainer}>
            <article>
                <h1 className={styleClass.postPageTitle}>
                    {post.title}
                </h1>
                <div className={styleClass.postPageDate}>
                    {post.updateAt}
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content}} className={styleClass.postPageContent}>
                </div>
            </article>
        </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps =async ({req, params}) => {
    const session = await getSession({req})
    //Para pegar a variavel de url que será meu slug
    const {slug} = params

    if(session == null){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    /* if(session.ActiveSubscription.data.status == 'canceled') */
    console.log(session)

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), {})

    //Tratamento dos dados 
    const post={
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString(
            'pt-BR',{
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        )
    }
    return{
        props:{
            post
        }
    }
}