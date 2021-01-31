import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

export default function Actualizar(props) {

     const [nombres, setNombres] = useState([])
     const [apellidos, setApellidos] = useState([])
     const [identificacion, setIdentificacion] = useState([])
     const [puesto, setPuesto] = useState([])
     const [tipo_contrato, setTipos_contrato] = useState([])
     const [contrato_select, setTContratoSelect] = useState([])

     useEffect( () =>{
          obtenerMiembro()
          setTipos_contrato(['Fijo', 'Temporal', 'Practicante'])
          // eslint-disable-next-line
     }, [])

     const obtenerMiembro = async () => {
          const id = props.match.params.id
          const token = sessionStorage.getItem('token')
          const respuesta = await Axios.get('http://localhost:4000/miembros/listar/' + id, {
               headers: {'autorizacion': token}
          })

          setNombres(respuesta.data.nombres)
          setApellidos(respuesta.data.apellidos)
          setIdentificacion(respuesta.data.identificacion)
          setPuesto(respuesta.data.puesto)
          setTContratoSelect(respuesta.data.tipo_contrato)
     }

     const actualizar = async (e) => {
          e.preventDefault()
          const id = props.match.params.id
          const token = sessionStorage.getItem('token')
          const miembro = {
              nombres,
              apellidos,
              identificacion,
              puesto,
              tipo_contrato: contrato_select
          }
          
          const respuesta = await Axios.put('http://localhost:4000/miembros/actualizar/' + id, miembro, {
              headers:{'autorizacion': token}
          })

          const mensaje = respuesta.data.mensaje
          
          Swal.fire({
              icon: 'success',
              title: mensaje,
              showConfirmButton: false
          })

          setTimeout(()=>{
              window.location.href='/index'
          }, 1500)
     }

     return (
          <div className="container col-md-6 mt-4">
               <div className="card">
                    <div className="card-header bg-dark text-white">
                         <div className="fila pb-2">
                         <div className="col-12">
                              <div className="col-1 align-self-center float-right p-0 m-0 b-0 fa-2x">
                                   <Link className="nav-link p-0 d-inline-block bg-dark text-white" to="/index">&times;</Link>
                              </div>
                              <div className="col-11 align-self-center pl-0">
                                   <h3 className="m-0 pl-2 pt-2">Editar Miembro</h3>
                              </div>
                         </div>
                         </div>
                         <div className="card-body">
                              <form onSubmit={actualizar}>
                                   <div className="form-group">
                                        <label>Nombres</label>
                                        <input type="text" className="form-control" required onChange={(e) => setNombres(e.target.value)} value={nombres}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Apellidos</label>
                                        <input type="text" className="form-control" required onChange={(e) => setApellidos(e.target.value)} value={apellidos}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Puesto</label>
                                        <input type="text" className="form-control" required onChange={(e) => setPuesto(e.target.value)} value={puesto} />
                                   </div>
                                   <div className="form-group">
                                        <label>Identificación</label>
                                        <input type="text" className="form-control" required onChange={(e) => setIdentificacion(e.target.value)} value={identificacion}/>
                                   </div>
                                   <div className="form-group">
                                        <label>Tipo de contrato</label>
                                        <select className="form-control" onChange={(e) => setTContratoSelect(e.target.value)} value={contrato_select}>
                                             {
                                                  tipo_contrato.map(tcontratos =>(
                                                       <option key={tcontratos}>
                                                            {tcontratos}
                                                       </option>
                                                  ))  
                                             }
                                        </select>
                                   </div>
                                   <div className="form-group pt-5">
                                        <button className="btn btn-warning btn-block" type="submit">Actualizar</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     )
}
