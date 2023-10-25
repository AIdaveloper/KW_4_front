import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const getBill = async (billId) =>{
    const {data} = await $authHost.post('api/bill/bill', {billId:billId})
    return data
}
export const deleteBill = async (billId) =>{
    const {data} = await $authHost.post('api/bill/delete', {billId:billId})
    return data
}
export const fillBill = async (billId, money ) =>{
    if (money = "" || typeof money === 'undefined'){
        money = 0
    }
    const {data} = await $authHost.post('api/bill/fill', {billId:billId, money:money})
    return data
}
export const getBills = async () =>{
    const {data} = await $authHost.post('api/bill/myBills', {})
    return data
}
export const getUserBills = async (userEmail) =>{
    const {data} = await $authHost.post('api/bill/userBills', {userEmail:userEmail})
    return data
}
export const createBill = async () =>{
    const {data} = await $authHost.post('api/bill/newBill', {})
    return data
}
