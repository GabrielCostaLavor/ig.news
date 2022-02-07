import { NextRequest, NextResponse } from "next/server";

//Eu sempre vou ter esses dois parametros, o REQUEST(minha promessa) que nele tem todos os meus daodos e o RESPONSE que eu vou dar uma resposta pra esses dados 
export default (request: NextRequest, response: NextResponse) => {
    const users = [
        {id: 1, nome: 'Gabriel'},
        {id: 2, nome: 'Goku'},
        {id: 3, nome: 'Vegeta'},
    ]

    return response.json(users)
}