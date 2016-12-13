import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App/App';
import Users from './components/Users/Users';
import './index.css';

ReactDOM.render(
  (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/users" component={Users}/>
  </Router>
),
  document.getElementById('root')
);
