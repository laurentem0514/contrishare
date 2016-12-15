import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './App.css';

class App extends Component {



  render() {
    return (
      <div className="home">
        <Nav />
        <header>
          <h1>contriShare</h1>
        </header>
      </div>
    );
  }
}

export default App;
