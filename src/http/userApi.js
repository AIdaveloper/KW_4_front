import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
export const registration = async (name, email, passport, password) =>{
    const {data} = await $host.post('api/user/registration', {name:name, passport:passport, email:email, password:password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email:email, password:password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const isAuth = async () =>{
    const {data} = await $authHost.get('api/user/auth', {})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
