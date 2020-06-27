import React from 'react';
import Header from './Header';
import '../styles/NewAgreement.css';
import axios from 'axios';

const HOST = 'http://34.95.157.220';
const PORT = '8821';

class NewAgreement extends React.Component{
  constructor(props){
    super(props)
    this.state={
      contrato : {},
      saveStat : false,
      selling : true,
      permalink : 'Enlace generado: '
    }
    this.renderPDF=this.renderPDF.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(event){
    event.preventDefault();
    this.renderPDF().then((resp)=>{
      alert('Documento generado correctamente, clickea en el enlace debajo la cabecera para descargar');
    }).catch((err)=>{
      alert('Ha ocurrido un error, intenta de nuevo más tarde');
    });
  }
  render(){
    return(
      <div className="App">
        <Header title="Allex Motos" lemma="Generar un contrato de compraventa"/>
        <div className="NAContainer">
          <a class="Enlace" style={{display: "table-cell"}} href={this.state.permalink} target="_blank" rel="noopener noreferrer"><h3>
          {this.state.permalink}
            </h3></a>
          <h3>Contrato de compra venta de vehiculo automotor</h3>
          <form onSubmit={this.handleOnSubmit} className="NAForm">
            <input className="NATextField" type="text" placeholder={"Lugar de celebración del contrato"}
            value={this.state.contrato.place}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.place = event.target.value;
              this.setState({contrato : cont});
            }}/> <br/>
            <input className="NATextField" type="text" placeholder={"Fecha de celebración del contrato (2020-01-16)"}
            value={this.state.contrato.date}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.date = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <h4>Datos del vendedor</h4>
            <input className="NATextField" type="text" placeholder={"Nombres y apellidos"}
            value={this.state.contrato.seller_fullname}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.seller_fullname = event.target.value;
              this.setState({contrato : cont});
            }}/> <br/>
            <input className="NATextField" type="text" placeholder={"Identificación (Solo numeros)"}
            value={this.state.contrato.seller_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.seller_id = event.target.value;
              this.setState({contrato : cont});
            }}/> <br/>
            <input className="NATextField" type="text" placeholder={"Dirección"}
            value={this.state.contrato.seller_address}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.seller_address = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <h4>Datos del comprador</h4>
            <input className="NATextField" type="text" placeholder={"Nombres y apellidos"} 
            value={this.state.contrato.buyer_fullname}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.buyer_fullname = event.target.value;
              this.setState({contrato : cont});
            }}></input><br/>
            <input className="NATextField" type="text" placeholder={"Identificación (Solo numeros)"}
            value={this.state.contrato.buyer_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.buyer_id = event.target.value;
              this.setState({contrato : cont});
            }}/> <br/>
            <input className="NATextField" type="text" placeholder={"Dirección"}
            value={this.state.contrato.buyer_address}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.buyer_address = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <h4>Datos del vehiculo automotor</h4>
            <input className="NATextField" type="text" placeholder={"Clase"}
            value={this.state.contrato.vehicle_class}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_class = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Marca"}
            value={this.state.contrato.vehicle_brand}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_brand = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Modelo"}
            value={this.state.contrato.vehicle_model}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_model = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Tipo de carrocería"}
            value={this.state.contrato.vehicle_carroceria}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_carroceria = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Color"}
            value={this.state.contrato.vehicle_color}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_color = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de motor"}
            value={this.state.contrato.vehicle_motor_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_motor_id = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de chasis"}
            value={this.state.contrato.vehicle_chasis_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_chasis_id = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de serie"}
            value={this.state.contrato.vehicle_series_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_series_id = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de puertas"}
            value={this.state.contrato.vehicle_doors}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_doors = event.target.value;
              this.setState({contrato : cont});
              }}/>
            <input className="NATextField" type="text" placeholder={"Capacidad"}
            value={this.state.contrato.vehicle_capacity}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_capacity = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de acta o manifiesto"}
            value={this.state.contrato.vehicle_acta_id}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_acta_id = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Ciudad"}
            value={this.state.contrato.vehicle_city}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_city = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Fecha"}
            value={this.state.contrato.vehicle_date}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_date = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Sitio de matricula"}
            value={this.state.contrato.vehicle_place}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_place = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Número de placa"}
            value={this.state.contrato.vehicle_placa}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_placa = event.target.value;
              this.setState({contrato : cont});
            }}/>
            
            <input className="NATextField" type="text" placeholder={"Servicios"}
            value={this.state.contrato.vehicle_services}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.vehicle_services = event.target.value;
              this.setState({contrato : cont});
            }}/> 
            <h4>Valor mutuamente acordado del vehiculo</h4>
            <input className="NATextField" type="text" placeholder={"$ Valor del vehiculo en pesos colombianos"}
            value={this.state.contrato.price}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.price = event.target.value;
              this.setState({contrato : cont});
            }}/>
            <input className="NATextField" type="text" placeholder={"Forma de pago"}
            value={this.state.contrato.payment_method}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.payment_method = event.target.value;
              this.setState({contrato : cont});
            }}/> 
            <input className="NATextField" type="text-area" placeholder={"Clausulas adicionales"}
            value={this.state.contrato.clausula_adicional}
            onChange={(event)=>{
              let cont = this.state.contrato;
              cont.clausula_adicional = event.target.value;
              this.setState({contrato : cont});
            }}/> <br/><br/>
            <label>
            ¿Deseas agregar este contrato a las ventas?
            <input className="NACheckBox" type="checkbox" name="saveStat" checked={this.state.saveStat}
              onChange={(event)=>{this.setState({saveStat:!this.state.saveStat})}}/>
            </label>
            <input type="submit" className="NAOKButton" value="Generar contrato en PDF"/>
          </form>
        </div>
      </div>
    )
  }
  renderPDF(){
    return new Promise((resolve, reject)=> {
      let config={
        method : 'POST',
        url : HOST+':'+PORT+'/generatePDF',
        data : {
          contract : this.state.contrato,
          saveStat : this.state.saveStat
        }
      }
      axios(config).then((resp)=>{
        this.setState({permalink : resp.data});
        this.forceUpdate();
        window.scrollTo(0, 0);
        resolve(resp);
      }).catch((err)=>{
        resolve(err);
      });
    });
  }
}

export default NewAgreement;
