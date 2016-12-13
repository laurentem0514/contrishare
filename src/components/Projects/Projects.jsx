import React, { Component } from 'react';
import Nav from '../Nav/Nav';
//import Autocomplete from 'react-autocomplete';
//import './Projects.css';


class Projects extends Component {
  constructor() {
    super();
    this.state = {
        nameSearch: '',
        projects: [],

    };
  }

  handleUpdateName(e) {
    this.setState({
      nameSearch: e.target.value
     });
  }


  handleSubmitSearch() {
    fetch(`http://localhost:3000/api/projects/search?name=${this.state.nameSearch}`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        projects: data,
      });
    })
    .catch(err => console.log('Error: ',err));
  }


  render() {
    const projects = this.state.projects.map(
       (project, i)=> {
        return (
          <div key={i}>
            {project.name}
          </div>
          )
    }, this);

    return (
        <div>
          <Nav />
          <div id="projects-search">
            <input
              type="text"
              value={this.state.nameSearch}
              onChange={event=>this.handleUpdateName(event)}
              placeholder="Search by name..."
            />
            {/*<Autocomplete
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
            />*/}
            <button onClick={()=>this.handleSubmitSearch()}>Search</button>
          </div>
          <div className="projects-results">
            {projects}
          {/*message for no users found*/}
          </div>
        </div>
      );

  }
}

export default Projects;
