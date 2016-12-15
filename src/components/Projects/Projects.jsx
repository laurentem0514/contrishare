import React, { Component } from 'react';
import Navigation from '../Nav/Nav';
import { Button } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';
//import './Projects.css';


class Projects extends Component {
  constructor() {
    super();
    this.state = {
        nameSearch: '',
        projectId: '',
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

  nameOnChange(event, value) {
    this.setState({ nameSearch:value, loading: true })
    fetch(`http://localhost:3000/api/projects/suggestions?text=${value}`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        projects: data
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
          <Navigation />
          <div id="projects-search">
            <Autocomplete
              inputProps={{name: "projects", id: "projects-autocomplete", placeholder: "Project Name"}}
              ref="autocomplete"
              value={this.state.nameSearch}
              items={this.state.projects}
              getItemValue={(item) => item.id}
              onSelect={(value, item) => {
                this.setState({ projectId:value, nameSearch: item.name, projects: [ item ] })
              }}
              onChange={(event, value) => this.nameOnChange(event, value)}
              renderItem={(item, isHighlighted) => (
                <div key={item.id} id={`t${item.id}`}>{item.name}</div>
              )}
            />
            <Button bsStyle="primary" bsSize="small" onClick={()=>this.handleSubmitSearch()}>Search</Button>
          </div>
          <div className="projects-results">
            {projects}
          {/*message for no results found*/}
          </div>
        </div>
      );

  }
}

export default Projects;
