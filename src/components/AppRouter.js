import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes"
// import auth from "../pages/Auth";
import {LOGIN_ROUTE} from "../utils/costants";
// import {Nav} from "react-bootstrap";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    // const {cnb} = useContext(Context)

    console.log(user)
    // console.log(cnb)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key={path} path={path} Component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                <Route key={path} path={path} Component={Component} exact/>
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;