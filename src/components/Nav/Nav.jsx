import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem } from 'react-bootstrap';

class Navigation extends Component {

  render(){
    return(
      <Nav bsStyle="pills">
        <LinkContainer to={{ pathname: '/' }}>
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/users' }}>
          <NavItem>Users</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/projects' }}>
          <NavItem>Projects</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default Navigation;
