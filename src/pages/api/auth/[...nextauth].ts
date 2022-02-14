import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { query as q, query} from "faunadb"
import { fauna } from "../../../service/faunadb"

export default NextAuth({
  //Minha autenticação com o github
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: 'read:user',
      }),
    ],
    //Callback é quando executo algo logo depois de uma ação
    callbacks: {
      async session(session) {
          try{
            const userActiveSubscription = await fauna.query(
              q.Get(
                q.Intersection([
                  q.Match(
                    q.Index('subscription_by_user_ref'),
                    q.Select(
                      'ref',
                      q.Get(
                        q.Match(
                          q.Index('user_by_email'),
                          q.Casefold(session.user.email)
                        )
                      )
                    )
                  ),                
                  q.Match(
                    q.Index('subscription_by_status'),
                    "active"
                  ),
                ])
              )
            )
            return{
              ...session,
              ActiveSubscription : userActiveSubscription
            }
          }catch{
            return {
              ...session,
              ActiveSubscription: null
            }
          }
      },
      async signIn(user, account, profile) {
        const { email } = user;
        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(user.email),
                  )
                )
            ),
            q.Create(
              q.Collection("users"), 
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email),
              )
            )
          )
          )
          return true;

        } catch (error) {
          console.log(error);
          return false;
        }
      },
    },
}
)