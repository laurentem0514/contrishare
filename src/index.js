import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App/App';
import Users from './components/Users/Users';
import AddUser from './components/AddUser/AddUser';
import Projects from './components/Projects/Projects';
import Contrib from './components/Contrib/Contrib';

import './index.css';

ReactDOM.render(
  (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/users" component={Users}/>
    <Route path="/users/add" component={AddUser}/>
    <Route path="/projects" component={Projects}/>
    <Route path="/contrib" component={Contrib}/>
  </Router>
),
  document.getElementById('root')
);
