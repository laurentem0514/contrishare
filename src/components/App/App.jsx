import React, { Component } from 'react';
import Users from '../Users/Users';
import { Link } from 'react-router'
//import './App.css';

class App extends Component {



  render() {
    return (
      <container>
      <header>
        <h1>contriShare</h1>
      </header>

     <ul role="nav">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
    </ul>

      </container>
    );
  }
}

export default App;
