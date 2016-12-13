import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Autocomplete from 'react-autocomplete';
//import './Users.css';


class Users extends Component {
  constructor() {
    super();
    this.state = {
        nameSearch: '',
        techSearch: '',
        searchTechId: '',
        users: [],
        technologies: []

    };
  }

  handleUpdateName(e) {
    this.setState({
      nameSearch: e.target.value
     });
  }

  handleUpdateTech(e) {
    this.setState({
      nameSearch: e.target.value
     });
  }


  handleSubmitSearch() {
    fetch(`http://localhost:3000/api/users/search?name=${this.state.nameSearch}&techId=${this.state.searchTechId}`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        users: data,
      });
    })
    .catch(err => console.log('Error: ',err));
  }

  techOnChange(event, value) {
    this.setState({ techSearch:value, loading: true })
    fetch(`http://localhost:3000/api/tech/suggestions?text=${value}`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        technologies: data
      });
    })
    .catch(err => console.log('Error: ',err));

  }
  render() {
    const users = this.state.users.map(
       (user, i)=> {
        return (
          <div key={i}>
            {user.name}
          </div>
          )
    }, this);

    return (
        <div>
          <Nav />
          <div id="users-search">
            <input
              type="text"
              value={this.state.nameSearch}
              onChange={event=>this.handleUpdateName(event)}
              placeholder="Search by name..."
            />
            <Autocomplete
              inputProps={{name: "technologies", id: "techs-autocomplete", placeholder: "Technology..."}}
              ref="autocomplete"
              value={this.state.techSearch}
              items={this.state.technologies}
              getItemValue={(item) => item.id}
              onSelect={(value, item) => {
                this.setState({ searchTechId:value, techSearch: item.name, technologies: [ item ] })
              }}
              onChange={(event, value) => this.techOnChange(event, value)}
              renderItem={(item, isHighlighted) => (
                <div key={item.id} id={`t${item.id}`}>{item.name}</div>
              )}
            />
            <button onClick={()=>this.handleSubmitSearch()}>Search</button>
          </div>
          <div className="users-results">
            {users}
          {/*message for no users found*/}
          </div>
        </div>
      );

  }
}

export default Users;
