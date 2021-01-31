import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Index() {

     const [miembros, setMiembros] = useState([])

     const [nombres, setNombres] = useState([])
     const [apellidos, setApellidos] = useState([])
     const [identificacion, setIdentificacion] = useState([])
     const [puesto, setPuesto] = useState([])
     const [tipo_contrato, setTipos_contrato] = useState([])
     const [contrato_select, setTContratoSelect] = useState([])

     useEffect( () =>{
          obtenerMiembros()
          setTipos_contrato(['Fijo', 'Temporal', 'Practicante'])
          setTContratoSelect('Fijo')
     }, [])

     const obtenerMiembros = async () => {
          const id = sessionStorage.getItem('idUsuario')
          const token = sessionStorage.getItem('token')
          const respuesta = await Axios.get('http://localhost:4000/miembros/listarmiembroslider/' + id, {
               headers: {'autorizacion': token}
          }) 
          setMiembros(respuesta.data)
     }

     const guardarMiembro = async (e) => {
          e.preventDefault()
          const usuario = {
               nombres,
               apellidos,
               identificacion,
               puesto,
               tipo_contrato: contrato_select,
               lider: sessionStorage.getItem('idUsuario')
          }
          const token = sessionStorage.getItem('token')
          const respuesta = await Axios.post('http://localhost:4000/miembros/crear', usuario, {
               headers: {'autorizacion': token}
          })
          const mensaje = respuesta.data.mensaje
          Swal.fire({
               icon: 'success',
               title: mensaje,
               showConfirmButton: false
          })
          setTimeout(() => {
               window.location.href='/index'
          }, 1500)
     } 
     
     const eliminarMiembro = async (id) => {
          const token = sessionStorage.getItem('token')
          const respuesta = await Axios.delete('http://localhost:4000/miembros/eliminar/' + id, {
               headers: {'autorizacion': token}
          })
          const mensaje = respuesta.data.mensaje
          Swal.fire({
               icon: 'success',
               title: mensaje,
               showConfirmButton: false,
               timer: 1500
          })
          obtenerMiembros()
     }

     const buscar = async (e) => {
          if(e.target.value === ""){
               return obtenerMiembros()
          }

          const buscar = e.target.value
          const token = sessionStorage.getItem('token')
          const respuesta = await Axios.get('http://localhost:4000/miembros/buscar/' + buscar, {
               headers: {'autorizacion': token}
          })

          setMiembros(respuesta.data)
     }

     return (
          <div>
               <header className="py-2 bg-light text-dark">
                    <div className="container">
                         <div className="row">
                              <div className="col-md-6">
                                   <h1><i className="fas fa-pencil-alt"></i> Miembros</h1>
                              </div>
                         </div>
                    </div>
               </header>


               <nav className="navbar py-4">
                    <div className="container">
                         <div className="col-md-3 pl-md-0 ml-md-0">
                              <Link to="#" className="btn btn-dark btn-block" data-toggle="modal" data-target="#addMiembro"><i className="fas fa-plus"></i>    Add Miembro</Link>
                         </div>
                         <div className="col-md-6 pr-md-0">
                              <div className="input-group pr-md-0 mr-md-0">
                                   <input type="search" className="form-control mr-sm-2 mr-md-0" autoFocus placeholder="Buscar..." aria-label="search" onChange={(e) => buscar(e)}/>
                              </div>
                         </div>
                    </div>
               </nav>

               <section>
                    <div className="container">
                         <div className="row">
                              <div className="col-md-12">
                                   <div className="card">
                                        <div className="card-header">
                                             <h4>Miembros de {sessionStorage.getItem('nombre')}</h4>
                                        </div>
                                        <table className="table table-responsive-lg table-striped">
                                             <thead className="thead-dark">
                                                  <tr>
                                                       <th>#</th>
                                                       <th>Nombres</th>
                                                       <th>Apellidos</th>
                                                       <th>Identificación</th>
                                                       <th>Tipo de Contrato</th>
                                                       <th>Puesto</th>
                                                       <th>Acciones</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {
                                                       miembros.map((miembro, i) => (
                                                            <tr key={miembro._id}>
                                                                 <td>{i + 1}</td>
                                                                 <td>{miembro.nombres}</td>
                                                                 <td>{miembro.apellidos}</td>
                                                                 <td>{miembro.identificacion}</td>
                                                                 <td>{miembro.puesto}</td>
                                                                 <td>{miembro.tipo_contrato}</td>
                                                                 <td className="pl-md-2">
                                                                      <div className="pl-md-0 mx-auto">
                                                                      <Link className="btn btn-warning mr-3" to={'/editar/' + miembro._id}>Editar</Link>
                                                                      <button className="btn btn-danger" onClick = {()=>eliminarMiembro(miembro._id)}>Eliminar</button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  }
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>

               <div className="modal fade" id="addMiembro">
                    <div className="modal-dialog modal-lg">
                         <div className="modal-content">
                              <div className="modal-header bg-dark text-white">
                                   <h5 className="modal-title">Add Miembro</h5>
                                   <button className="close" data-dismiss="modal">
                                        <span className="bg-dark text-white">&times;</span>
                                   </button>
                              </div>
                              <div className="modal-body">
                                   <form onSubmit={guardarMiembro}>
                                        <div className="form-group">
                                             <label>Nombres</label>
                                             <input type="text" className="form-control" required onChange={(e) => setNombres(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                             <label>Apellidos</label>
                                             <input type="text" className="form-control" required onChange={(e) => setApellidos(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                             <label>Identificación</label>
                                             <input type="text" className="form-control" required onChange={(e) => setIdentificacion(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                             <label>Puesto</label>
                                             <input type="text" className="form-control" required onChange={(e) => setPuesto(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                             <label>Tipo de Contrato</label>
                                             <select className="form-control" required onChange={(e) => setTContratoSelect(e.target.value)}>
                                                  {
                                                     tipo_contrato.map(tcontratos =>(
                                                          <option key={tcontratos}>
                                                               {tcontratos}
                                                          </option>
                                                     ))  
                                                  }
                                             </select>
                                        </div>
                                        <div className="fotm-group pt-3">
                                             <button type="submit" className="btn btn-dark btn-block">Guardar</button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>    
          </div>
     )
}
