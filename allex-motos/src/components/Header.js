import React from 'react';
import '../styles/Header.css';
class Header extends React.Component {
  constructor(props){
    super(props);
    if(props.location && props.location.state){
      this.state={
        title : props.location.state.title || "Allex Motos",
        lemma : props.location.state.lemma || "Compra y venta de motos",
      }
    } else{
      this.state={
        title : props.title || "Allex Motos 1.0",
        lemma : props.lemma || "Compra venta y taller de motos",
        congrats : props.congrats
      }
    }
  }
  render(){
    return(
    <div className="Container">
      <h1>{this.state.title}</h1>
    <p>{this.state.lemma}<br/><br/>{this.state.congrats}</p>
    </div>);
  }
}

export default Header;