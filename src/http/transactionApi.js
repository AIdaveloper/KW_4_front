import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const getTransaction = async (transactionId) =>{
    const {data} = await $authHost.post('api/transactions/info', {transactionId:transactionId})
    return data
}
export const getBillTransactions = async (billId) =>{
    console.log(billId)
    const {data} = await $authHost.post('api/transactions/getBillTransactions', {billId:billId})
    return data
}
export const transferMoney = async (billFrom, billTo, money) =>{
    const {data} = await $authHost.post('api/transactions/transfer', {billFrom:billFrom, billTo:billTo, money:money})
    return data
}
