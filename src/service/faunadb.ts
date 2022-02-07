import { Client } from "faunadb";
//Conectando com o faunadb
export const fauna = new Client({
    secret: process.env.FAUNA_KEY,
    domain: 'db.fauna.com', 
})