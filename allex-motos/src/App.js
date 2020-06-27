import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import NewAgreement from './components/NewAgreement';
import Stats from './components/Stats';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/main' exact component={Main}/>
        <Route path='/new-contrato' exact component={NewAgreement}/>
        <Route path='/estadisticas' exact component={Stats}/>
        <Route path='/usuarios' exact component={Users}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
