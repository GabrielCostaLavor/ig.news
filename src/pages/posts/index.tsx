import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../service/prismic'
import styleClass from './style.module.scss'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

type postsArray = {
    slug: string;
    title: string;
    execerpt: string;
    updateAt: string;
}

interface propsPosts{
    posts : postsArray[]
}

export default function Posts({posts} : propsPosts){
    //console.log(posts.map(postsData => postsData.updateAt))
    return(
        <>
        <head>
            <title>POSTS || IGNEWS</title>
        </head>
        <main>
            <div className={styleClass.postsContainer}>
                    {
                    posts.map(postsData =>(
                        /* {console.log(postsData)} */
                    <div className={styleClass.postContents}>
                        <Link href={'/posts/'+ postsData.slug}>
                        <a key={postsData.slug} >
                            <div className={styleClass.postsDate}>
                                {postsData.updateAt}
                            </div>
                            <div className={styleClass.postText}>
                                <div className={styleClass.postTitle}>
                                    <h1>
                                        {postsData.title}
                                    </h1>
                                </div>
                                <div className={styleClass.postParagraph}> 
                                    {postsData.execerpt}
                                </div>
                            </div>
                        </a>
                        </Link>
                    </div>
                    ))
                    }
            </div>
        </main>
        </>
    )
}
export const getStaticProps: GetStaticProps = async () => {
    //Tô pegando as funcionalidades que estão no meu service
    const prismic = getPrismicClient()
    //Tô retornando todos os posts que o type dele for 'post'
    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
      ], {
        //Retorna esse dois objetos
        fetch: ['title', 'content'], 
        pageSize: 100, 
      })
      
      //To pegando agr os dados que eu tô retornando da api para poder usa-los
      const posts = response.results.map(posts => {
          return{
              //pegando o slug do post
              slug: posts.uid,
              //Para converter o que eu tô retornando em texto
              title: RichText.asText (posts.data.title),
              //Pega todos os contents que são do tipo paragrafo como find(encontrar)
              execerpt:posts.data.content.find(content => content.type === 'paragraph')?.text ?? '',
              //
              updateAt: new Date(posts.last_publication_date).toLocaleDateString(
                  'pt-BR',{
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                  }
              )
          }
      })

      //console.log(posts)
    
      return {
        props:{
            posts
        }
      }
}