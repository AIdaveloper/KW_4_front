import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/costants";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [passport, setPassport] = useState('')


    const click = async () => {
        try {

            let data
            if (isLogin) {
                data = await login(email, password)
                console.log(data)

            }
            else {
                data = await registration(name, email, passport , password)
                console.log(data)

            }
            user.setUser(data)
            user.setIsAuth(true)
            history(MAIN_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }
    }
    return (
        <Container className="d-flex mt-5 justify-content-center align-content-center"
        style={{height: window.innerHeight-200}}>
            <Card style={{width: 600}} className="p-5 d-flex">
                <h2 className='h-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                <Form className="d-flex flex-column">
                    <Form.Control className='mt-3'
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)}
                                  placeholder='Введите email...'></Form.Control>
                    <Form.Control className='mt-3'
                                  value={password}
                                  onChange={e=>setPassword(e.target.value)}
                                  type='password'
                                  placeholder='Введите пароль...'></Form.Control>
                    <Row className='d-flex justify-content-between align-content-center mt-3 p-3'>

                        <p className='w-auto h-auto mb-0 d-flex justify-content-center'>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className='ms-2' >Зарегистрируйтесь!</NavLink>
                        </p>
                        <Button className='w-auto' variant={'outline-success'} onClick={click}>Войти</Button>
                    </Row>
                </Form>
                    :
                <Form className="d-flex flex-column">
                    <Form.Control className='mt-3'
                                  value={name}
                                  onChange={e=>setName(e.target.value)}
                                  placeholder='Введите имя...'></Form.Control>
                    <Form.Control className='mt-3'
                                  value={passport}
                                  onChange={e=>setPassport(e.target.value)}
                                  placeholder='Введите паспорт...'></Form.Control>
                    <Form.Control className='mt-3'
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)}
                                  placeholder='Введите email...'></Form.Control>
                    <Form.Control className='mt-3'
                                  value={password}
                                  onChange={e=>setPassword(e.target.value)}
                                  type='password'
                                  placeholder='Введите пароль...'></Form.Control>

                    <Row className='d-flex justify-content-between align-content-center mt-3 p-3'>
                        <p className='w-auto h-auto mb-0 d-flex justify-content-center'>
                            Уже есть аккаунт? <NavLink to={LOGIN_ROUTE} className='ms-2' >Войти!</NavLink>
                        </p>
                        <Button className='w-auto' variant={'outline-success'} onClick={click}>Зарегистрироваться</Button>
                    </Row>
                </Form>
                }
            </Card>
        </Container>
);
});

export default Auth;