import React from 'react';
import Header from './Header';
import '../styles/Main.css';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username : props.location.state.username,
      token : props.location.state.token
    }
    this.goToContrato=this.goToContrato.bind(this);
    this.goToIventario=this.goToIventario.bind(this);
    this.goToEstadisticas=this.goToEstadisticas.bind(this);
    this.goToUsuarios=this.goToUsuarios.bind(this);
    this.goToSignOut=this.goToSignOut.bind(this);
  }
  goToContrato(event){
    this.props.history.push('/new-contrato', {username : this.state.username, 
    token : this.state.token});
  }
  goToIventario(event){
    this.props.history.push('/inventario', {username : this.state.username,
    token : this.state.token});
  }
  goToEstadisticas(event){
    this.props.history.push('/estadisticas', {username : this.state.username,
      token : this.state.token});
  }
  goToUsuarios(event){
    this.props.history.push('/usuarios', {username : this.state.username,
      token : this.state.token});
  }
  goToSignOut(event){
    this.props.history.push('/login', {username : this.state.username,
      token : this.state.token});
  }
  render(){
    return(
      <div className="App">
        <Header title="Allex Motos" lemma="Menu principal"/>
        <div className="List">
          <div className="ListItem">
            <button onClick={this.goToContrato} className="MainButton">Generar contrato de compraventa</button>
          </div>
          <div className="ListItem">
            <button onClick={this.goToEstadisticas} className="MainButton">Archivo</button>
          </div>
          <div className="ListItem">
            <button onClick={this.goToUsuarios} className="MainButton">Gestión de usuarios</button>
          </div>
          <div className="ListItem">
            <button onClick={this.goToSignOut} className="MainButton">Cerrar sesión</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;  
