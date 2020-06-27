import React from 'react';
import Header from './Header';
import axios from 'axios';
import '../styles/Stats.css';
const HOST = "http://192.168.18.12";
const PORT = "8821";

class Stats extends React.Component{
  constructor(props){
    super(props);

    this.state={
      contracts : [],
      year : '',
      month : ''
    }

    let config={
      method : "GET",
      url : HOST+':'+PORT+'/get-contracts'
    }
    axios(config).then((resp)=>{
      let data=resp.data;
      if(data.result==='OK'){
        this.setState({contracts : data.data});
      } else{
        alert('No contracts yet');
      }
    }).catch((err)=>{
      alert(err);
    });
    this.renderItem=this.renderItem.bind(this);
    this.filter=this.filter.bind(this);
    this.filterThisMonth=this.filterThisMonth.bind(this);
    this.getAll=this.getAll.bind(this);
  }

  filter(event){
    let config={
      method:'GET',
      url: HOST+':'+PORT+'/get-contracts-month',
      params:{
        year : this.state.year,
        month : this.state.month
      },
    }
    axios(config).then((res)=>{
      if(res.data.result==='OK'){
        this.setState({contracts : res.data.data});
      }
    }).catch((err)=>{
      alert('Ocurrio un error, intenta más tarde');
    });
  }
  filterThisMonth(event){
    let now = new Date();
    let month=now.getMonth()+1;
    let year=now.getFullYear();
    if(month<10){
      month='0'+month.toString();
    } else{
      month=month.toString();
    }
    year=year.toString();
    let config={
      method:'GET',
      url: HOST+':'+PORT+'/get-contracts-month',
      params:{
        year : year,
        month : month
      },
    }
    axios(config).then((res)=>{
      if(res.data.result==='OK'){
        this.setState({contracts : res.data.data});
      }
    }).catch((err)=>{
      alert('Ocurrio un error, intenta más tarde');
    });
  }
  getAll(event){
    let config={
      method:'GET',
      url: HOST+':'+PORT+'/get-contracts-month',
      params:{
        year : '',
        month : ''
      }
    }
    axios(config).then((res)=>{
      if(res.data.result==='OK'){
        this.setState({contracts : res.data.data});
      }
    }).catch((err)=>{
      alert(err);
    });
  }
  renderItem(i){
    return(
      <div className="StatsItem">
        <div className="StatItemInfo">
          Comprador: <b>{this.state.contracts[i].buyer_fullname}</b> C.C. <b>{this.state.contracts[i].buyer_id}</b><br/>
          Vendedor : <b>{this.state.contracts[i].seller_fullname}</b> C.C. <b>{this.state.contracts[i].seller_id}</b><br/>
          Marca: <b>{this.state.contracts[i].vehicle_brand}</b> <br/>
          Modelo: <b>{this.state.contracts[i].vehicle_model}</b><br/>
          Placa: <b>{this.state.contracts[i].vehicle_placa}</b><br/>
          Precio: <b>{this.state.contracts[i].price}</b><br/>
          Fecha: <b>{this.state.contracts[i].date}</b><br/>
          <button className="StatItemButton" onClick={(event)=>{
            let download = window.confirm('¿Deseas descargar este contrato?');
            if(download){
              window.open(HOST+':'+PORT+'/download?file='+this.state.contracts[i].filename);
            }
          }}>Descargar contrato</button><br/>
          <button className="StatItemButton" onClick={(event)=>{
            let del = window.confirm('¿Deseas eliminar este contrato?');
            if(del){
              let config={
                method : 'POST',
                url : HOST+':'+PORT+'/delete-contract',
                data : {
                  filename : this.state.contracts[i].filename
                }
              };
              axios(config).then((res)=>{
                if(res.data.result==='OK'){
                  let conts = this.state.contracts;
                  conts.splice(i, 1);
                  this.setState({contracts : conts});
                }
              }).catch((err)=>{
                alert('Ocurrio un error al eliminar el archivo');
              });
            }
          }}>Borrar contrato</button>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div className = "App">
        <Header title = "Allex Motos" lemma = "Compraventa de motos" congrats=""/>
        <div className="StatsNavBar">
            <div className="LeftNavBar">
              <input class="NavBarTextField" type="text" value={this.state.year} 
              onChange={(event) =>{this.setState({year: event.target.value})}}
              placeholder={"Año"}/>
              <input class="NavBarTextField" type="text" value={this.state.month} 
              onChange={(event) =>{this.setState({month: event.target.value})}}
              placeholder={"Mes"}/>
            </div>
            <div className="RightNavBar">
              <button className="NavButton" onClick={this.filter}>Filtrar</button>
              <button className="NavButton" onClick={this.filterThisMonth}>Actual</button>
              <button className="NavButton" onClick={this.getAll}>Todo</button>
            </div>
          </div>
        <div className =  "StatsContainer">
          <div>
            {
              this.state.contracts.map((value, index)=>{
                return this.renderItem(index);
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;