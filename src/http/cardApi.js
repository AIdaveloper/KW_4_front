import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const getCard = async (cardId) =>{
    const {data} = await $authHost.post('api/card/card', {cardId:cardId})
    return data
}
export const deleteCard = async (cardId) =>{
    const {data} = await $authHost.post('api/card/delete', {cardId:cardId})
    return data
}
export const getCards = async () =>{
    const {data} = await $authHost.post('api/card/myCards', {})
    return data
}
export const setLimit = async (cardId, limit) =>{
    console.log(cardId, limit)
    const {data} = await $authHost.post('api/card/setLimit', {cardId:cardId, limit:limit})
    return data
}
export const createCard = async (billId, limit = 0) =>{
    const {data} = await $authHost.post('api/card/newCard', {billId:billId, limit:limit})
    return data
}
