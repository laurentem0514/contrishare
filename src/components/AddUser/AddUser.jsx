import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { Router } from 'react-router';


class AddUser extends Component {
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  nameChange(e){
    this.setState({name: e.target.value});
  }

  handleCreate(){
    // web request to endpoint POST /api/users

    fetch('http://localhost:3000/api/users',
      {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify( {name : this.state.name} )
      }
      )
    .then(r => r.json())
    .then((data) => {
      //this.context.router.push('/users');
      })
    .catch(err => console.log('Error: ',err));
  }

  render(){
    return(
    <container>
      <Nav />
      <input
        type="text"
        placeholder="Full Name"
        value={this.state.name}
        onChange={e=> this.nameChange(e)}
      />
      <button onClick={()=>this.handleCreate()}>Create</button>

    </container>
    );
  }
}

export default AddUser;
