import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login';
import Registro from './components/Registro';
import Index from './components/Index';
import Actualizar from './components/Actualizar';
import Footer from './components/Footer';



const autenticacion = () => {
  const token = sessionStorage.getItem('token')
  if(token){
    return true
  }else{
    return false
  }
}

const MyRoute = (props) => {
  return autenticacion()? <Route {...props}/>: <Redirect to='/'/>
}

const autenticacionNo = () => {
  const token = sessionStorage.getItem('token')
  if(token){
    return false
  }else{
    return true
  }
}

const MyRouteNo = (props) => {
  return autenticacionNo()? <Route {...props}/>: <Redirect to='/index'/>
}

function App() {
  return (
    <Router>
      <Nav/>
      <MyRouteNo path = '/' exact component = {Login}/>
      <MyRouteNo path = '/registrar' exact component = {Registro}/>
      <MyRoute path = '/index' exact component = {Index}/>
      <MyRoute path = '/editar/:id' exact component = {Actualizar}/>
      <Footer/>   
    </Router> 
  );
}

export default App;
