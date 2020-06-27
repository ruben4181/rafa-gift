import React from 'react';
import '../styles/Login.css';
import Header from './Header';
import axios from 'axios';

const HOST = 'http://34.95.157.220';
const PORT = '8821';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username : '',
      password : ''
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn(event){
    event.preventDefault();
    let config = {
      method : 'POST',
      url : HOST+':'+PORT+'/verifyUser',
      data : {
        user : this.state.username,
        password : this.state.password
      }
    }
    axios(config).then((res)=>{
      if(res.data.result==='OK'){
        this.props.history.push('/main', {
          token : 'TOKEN',
          username : this.state.username
        });
      } else{
        alert('Usuario/contraseña incorrectos');
      }
    }).catch((err)=>{
      alert(err);
    });
  }

  render(){
    return(
      <div className="App">
        <Header title="Allex Motos" lemma="Compraventa de Motos" 
        congrats="Feliz cumpleaños, hermano, que Dios bendiga nuestra familia y que su negocio crezca siempre"/>
        <div className="Login-Container">
          <form onSubmit={this.signIn}>
            <div className="Form-Container">
              <h3>Inicio de sesión:</h3>
              <input className="Login-Textfield" type="text" value={this.state.username} onChange={(event)=>{
                this.setState({username : event.target.value})
              }} placeholder="Nombre de usuario"/> <br/>
              <input className="Login-Textfield" type="password" value={this.state.password} onChange={(event)=>{
                this.setState({password:event.target.value})
              }} placeholder="Contraseña"/>
            </div>
            <br/>
            <div className="Button-Footer">
            <input className="Login-Submit" type="submit" value={"Ingresar"}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
