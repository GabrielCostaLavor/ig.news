import { GetStaticProps } from "next";
import { getSession, useSession } from 'next-auth/client'
import Head from "next/head";
import styleClass from './pagePostPreview.module.scss'
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../service/prismic";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";


interface pagePostsPropsPreview{
    post : {
        slug: string,
        title: string,
        content: string,
        updateAt: string,
    }
}
export default function PostPreview({post} : pagePostsPropsPreview){
    const [session] = useSession()
    const router = useRouter() 

    useEffect(() => {
        if(session?.ActiveSubscription){
            router.push(`/posts/${post.slug}`)
        }
    }, [session])
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
            <Link href='/'>
            <button className={styleClass.buttonPreviewSubscribe} type="submit">
                Wanna continue reading? <span>Subscribe now </span><img src="/imagens/image 50.png" alt="" />
            </button>
            </Link>
        </main>
        </>
    )
}
export const getStaticPaths = () => {
    return{
        paths: [],
        fallback: 'blocking'
    }
}
export const getStaticProps: GetStaticProps =async ({params}) => {

    //getStaticProps não recebe requisições
    //Para pegar a variavel de url que será meu slug
    const {slug} = params

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    //Tratamento dos dados 
    const post={
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 4)),
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
        },
        redirect: 60 * 60 //uma hr
    }
}