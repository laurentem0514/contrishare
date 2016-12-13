import React, { Component } from 'react';
import { Link } from 'react-router'


class Nav extends Component {

  render(){
    return(
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/projects">Projects</Link></li>
    </ul>
    );
  }
}

export default Nav;
