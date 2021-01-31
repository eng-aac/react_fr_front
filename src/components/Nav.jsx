import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {

     const [menu, setMenu] = useState(false)

     useEffect(() => {
          if(sessionStorage.getItem('token')){
               setMenu(true)
          }
     }, [])

     const salir = (e) => {
          sessionStorage.clear()
          window.location.href='/'
          e.prevenDefault()
     }

     return (
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0 sticky-top">
                    {
                         menu ?
          
                         <div className="container">
                              <Link className="navbar-brand" to="/index">Teams</Link>
                              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                   <span className="navbar-toggler-icon"></span>
                              </button>
                              <div className="collapse navbar-collapse" id="navbarNav">
                                   <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                             <Link className="nav-link disabled pl-5" to="/"><i className='fas fa-user'></i> Bienvenido {sessionStorage.getItem('nombre')}</Link>
                                        </li>
                                        <li className="nav-item">
                                             <Link className="nav-link pl-5" to="/" onClick={(e)=>salir()}><i className='fas fa-user-times'></i> Salir</Link>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    :
                         <div className="container">
                              <Link className="navbar-brand" to="/">Teams</Link>
                              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                   <span className="navbar-toggler-icon"></span>
                              </button>
                              <div className="collapse navbar-collapse" id="navbarNav">
                                   <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                             <Link className="nav-link pl-5" to="/registrar"><i className='fas fa-user-plus'></i> Registrar</Link>
                                        </li>
                                   </ul>
                              </div>
                         </div>
                    }
          </nav>
     )
}
