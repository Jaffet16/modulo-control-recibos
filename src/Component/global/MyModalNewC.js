import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/DatosCSS.css';
import './css/bootstrap.css';
import './css/NewC.css';
import './css/ListarComprobanteNewC.css';
class MyModal extends Component{

    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
        // this.texto=React.createRef();
    }

    handlerGuardar(){
        //let data=this.texto.current.value;
        if(document.getElementById("verificar").value === "true"){
          var verif=true;
        }else{
           verif=false
        }
        var data = new Object();
        data.id_alum=this.props.id;
        data.id_concepto =document.getElementById("concepto").value;
        data.id_ubicacion =document.getElementById("ubicacion").value;
        data.cod_alumno =document.getElementById("codigo").value;
        data.numero =document.getElementById("recibo").value;
        data.importe =document.getElementById("importe").value;
        data.observacion =document.getElementById("obs").value;
        data.fecha =document.getElementById("fecha").value;
        data.validado =verif;
        data.tipo =document.getElementById("tipo").value;
        //ModalManager.close();

        const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/new';
        fetch(url,{

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    this.setState({
                       isLoading:false
                    });
                    alert('Datos cargados exitosamente');
                }else{}
            })
        console.log(data);
    }



    render(){
        let nombre = this.props.nombre;
        return (
            <Modal
                effect={Effect.SlideFromBottom}>
        <div className="container" id="advanced-search-form">

         <form>
             <div className="form-group">
                 <label >Nombres y Apellidos</label>
                 <input type="text" class="form-control" placeholder="Nombres" id="nombre" value={nombre} required/>
             </div>
             <div className="form-group">
                 <label >Concepto de Pago</label>
                 <input type="text" class="form-control" placeholder="Concepto" id="concepto" required/>
             </div>
             <div className="form-group">
                 <label >Codigo</label>
                 <input type="text" class="form-control" placeholder="Codigo" id="codigo" required/>
             </div>
             <div className="form-group">
                 <label>Recibo</label>
                 <input type="text" class="form-control" placeholder="Recibo" id="recibo" required/>
             </div>
             <div className="form-group">
                 <label>Importe</label>
                 <input type="number" class="form-control" placeholder="Importe" id="importe" required/>
             </div>
             <div className="form-group">
                 <label >Fecha</label>
                 <input type="date" id="fecha" class="form-control" required/>
             </div>
             <div className="form-group">
                 <label >Ubicación</label>
                 <select required id ="ubicacion" class="form-control" >
                   <option value="" >Seleccione Ubicacion</option>
                   <option value="1" >Físico</option>
                   <option value="2" >Copia</option>
                   <option value="3" >No Disponible</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Tipo</label>
                 <select required id ="tipo" class="form-control" >
                   <option value="" >Seleccione Tipo</option>
                   <option value="1" >Banco</option>
                   <option value="2" >Manual</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Verificar</label>
                 <select required id ="verificar" class="form-control" >
                   <option value="true" >Validado</option>
                   <option value="false" >No Validado</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Observaciones</label>
                 <textarea rows="2" cols="30" id="obs">
                 </textarea>
             </div>
             <button type = "button" className = "btn btn-secondary" data-dismiss = "modal" onClick = {ModalManager.close}>Cerrar</button>
             <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar}> Enviar </button>
         </form>
        </div>


            </Modal>
        );
    }
}
export default MyModal;