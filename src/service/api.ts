import axios from "axios";
//Define uma rota para as apis pra que eu posse acessar minhas api no front
export const api = axios.create({
    baseURL: '/api'
})