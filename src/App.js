import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Navbar, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import { isAuth} from './http/userApi'

const App = observer( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        isAuth().then(data =>{
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, [])

    if (loading){
        return <Spinner animation={"grow"}/>
    }
  return (
      <BrowserRouter>
          <NavBar/>
          <AppRouter/>
      </BrowserRouter>
  )
});

export default App;