import React from 'react';
import Header from './Header';
import axios from 'axios';
import '../styles/Users.css';

const HOST = 'http://192.168.18.12';
const PORT = '8821';

class Users extends React.Component{
  constructor(props){
    super(props)
    if(props.location.state){
      this.state={
        username : props.location.state.username,
        token : props.location.state.token,
        changePass : false,
        newUser : false,
        newPassFields : ['', ''],
        newUserString : '',
        newUserPassFields : ['', '']
      }
    } else{
      this.state={
        username : undefined,
        token : undefined,
        changePass : false,
        newUser : false,
        newPassFields : ['', ''],
        newUserString : '',
        newUserPassFields : ['', '']
      }
    }
    
    this.renderChangePassword=this.renderChangePassword.bind(this);
    this.changePass=this.changePass.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  renderChangePassword(){
    if(!this.state.changePass){
      return(<div></div>);
    } else{
      return(<div className="ChangePassCont">
        <form onSubmit={this.changePass}>
          <input type="password" className = "Login-Textfield" placeholder="Contraseña nueva"
          value={this.state.newPassFields[0]} onChange={(event)=>{
            let fields = this.state.newPassFields;
            fields[0] = event.target.value;
            this.setState({newPassFields : fields});
          }}/>
          <input type="password" className = "Login-Textfield" placeholder="Repita la contraseña nueva"
          value={this.state.newPassFields[1]} onChange={(event)=>{
            let fields = this.state.newPassFields;
            fields[1] = event.target.value;
            this.setState({newPassFields : fields});
          }}/>
          <input type="submit" className = "Users-Submit" value={"Confirmar"}/>
        </form>
      </div>);
    }
  }

  renderNewUser(){
    if(!this.state.newUser){
      return(<div></div>);
    } else{
      return(<div className="ChangePassCont">
      <form onSubmit={this.newUser}>
        <input type="text" className = "Login-Textfield" placeholder="Nombre de usuario nuevo"
        value = {this.state.newUserString} onChange={(event)=>{this.setState({newUserString : event.target.value})}}/>
        <input type="password" className = "Login-Textfield" placeholder="Contraseña nueva"
        value={this.state.newUserPassFields[0]} onChange={(event)=>{
          let fields = this.state.newUserPassFields;
          fields[0] = event.target.value;
          this.setState({newUserPassFields : fields});
        }}/>
        <input type="password" className = "Login-Textfield" placeholder="Repita contraseña nueva"
        value={this.state.newUserPassFields[1]} onChange={(event)=>{
          let fields = this.state.newUserPassFields;
          fields[1] = event.target.value;
          this.setState({newUserPassFields : fields})
        }}/>
        <input type="submit" className = "Users-Submit" value={"Confirmar"}/>
      </form>
    </div>);
    }
  }

  changePass(event){
    event.preventDefault();
    if(this.state.username){
      if(this.state.newPassFields[0]!==this.state.newPassFields[1]){
        alert('Contraseñas no coinciden, intente de nuevo');
      } else{
        let config={
          method : 'POST',
          url : HOST+':'+PORT+'/updatePassword',
          data : {
            user : this.state.username,
            password : this.state.newPassFields[0]
          },
          headers : {'Content-Type' : 'application/json'}
        }
        axios(config).then((resp)=>{
          if(resp.data.result==='OK'){
            alert('Actualizo su contraseña con exito');
            this.props.history.push('/');
          } else{
            alert('Un error ha ocurrido, intenta más tarde');
          }
        }).catch((err)=>{
          alert(err);
        })
      }
    } else{
      alert('Inicia sesión de nuevo');
      this.props.history.push('/login');
    }
  }

  newUser(event){
    event.preventDefault();
    if(this.state.newUserString!==''){
      if(this.state.newUserPassFields[0]===this.state.newUserPassFields[1]){
        let config = {
          method : 'POST',
          url : HOST+':'+PORT+'/createUser',
          data : {
            user : this.state.newUserString,
            password : this.state.newUserPassFields[0]
          }
        };
        axios(config).then((resp)=>{
          if(resp.data.result==='OK'){
            alert('Usuario creado correctamente');
          } else{
            alert('Ha ocurrido un error, intenta más tarde');
          }
        }).catch((err)=>{
          alert(err);
        });
      } else{
        alert('Las contraseñas no coinciden');
      }
    } else{
      alert('Por favor, elija un nombre de usuario nuevo');
    }
  }

  render(){
    return(
      <div className="App">
        <Header title="Allex Motos" lemma="Compraventa de motos" congrats="Gestión de usuarios"/>
        <div className="StatsNavBar">
          <button className="UsersButton" onClick={(event)=>{
            this.setState({changePass : !this.state.changePass});}}
            >Cambiar mi contraseña</button>
          <button className="UsersButton" onClick={(event)=>{
            this.setState({newUser : !this.state.newUser});
          }}>Crear un nuevo usuario</button>
        </div>
        <div className="UsersContainer">
          {this.renderChangePassword()}
          {this.renderNewUser()}
        </div>
      </div>
    )
  }
}

export default Users;