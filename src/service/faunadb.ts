import { Client } from "faunadb";
//Conectando com o faunadb
//A pasta service é a integração com um serviço que vou usar numa api ou no back
export const fauna = new Client({
    secret: process.env.FAUNA_KEY,
    domain: 'db.fauna.com',
})