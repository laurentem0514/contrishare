import React, { Component } from 'react';
import Navigation from '../Nav/Nav';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';


class AddUser extends Component {
  constructor(){
    super();
    this.state = {
      avatar: '',
      name: ''
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
    // .then(r => r.json())
    // .then((data) => {
    //   //this.context.router.push('/users');
    //   //browserHistory.push('/users');
    //   })
    .catch(err => console.log('Error: ',err));
  }

  render(){
    return(
    <container>
      <Navigation />
      <div>Add New User</div>
      <DropdownButton title="Select an Avatar">
        <MenuItem src="images/avatar1.png">Avatar 1</MenuItem>
        <MenuItem href="#podcasts">Podcasts</MenuItem>
        <MenuItem href="#">Tech I Like</MenuItem>
        <MenuItem href="#">About me</MenuItem>
        <MenuItem href="#addBlog">Add a Blog</MenuItem>
      </DropdownButton>
      <input
        type="text"
        placeholder="Full Name"
        value={this.state.name}
        onChange={e=> this.nameChange(e)}
      />
      <Button bsStyle="primary" bsSize="small" onClick={()=>this.handleCreate()}>Create</Button>

    </container>
    );
  }
}

export default AddUser;
