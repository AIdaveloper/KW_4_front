import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/costants";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history =  useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        history(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color:'white'}} to={MAIN_ROUTE} onClick={()=>history(MAIN_ROUTE)}>MyBank</NavLink>
                {!user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white'}} >
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизоваться</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color:'white'}} >
                        <Button variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                }

            </Container>
        </Navbar>

    );
});

export default NavBar;