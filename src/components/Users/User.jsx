import React, { Component } from 'react';
import Navigation from '../Nav/Nav';
import UserProfile from './UserProfile';
import Autocomplete from 'react-autocomplete';
import { Button, FormControl, Form, Table, Image } from 'react-bootstrap';
import './User.css';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        contribs: [],
        nameSearch: '',
        duration: '',
        techSearch: '',
        searchTechId: '',
        description: '',
        technologies: []
    };
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/users/${this.props.params.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({ user: data });
    })
    .catch(err => console.log('Error: ',err));

    fetch(`http://localhost:3000/api/contrib/search?userId=${this.props.params.id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({ contribs: data });
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

  durationChange(e){
    this.setState({duration: e.target.value});
  }

  descriptionChange(e){
    this.setState({description: e.target.value});
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


   handleCreate(){
    const newEntry = { userId : this.state.user._id,
                               projectId : this.state.projectId,
                               techId: this.state.searchTechId,
                               duration: this.state.duration,
                               description: this.state.description

        };
    fetch('http://localhost:3000/api/contrib',
      {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newEntry)
    })
    //.then(r => r.json())
    .then(r => {
      const newContribs = [...this.state.contribs, ...[newEntry]];
      this.setState({
            contribs: newContribs,
            nameSearch: '',
            duration: '',
            techSearch: '',
            searchTechId: '',
            description: ''
          });
      })
    .catch(err => console.log('Error: ',err));
  }

  render() {
      const contribs = this.state.contribs.map(
        (contrib, i) => {
          return (
            <tr key={i}>
              <td>{ contrib.description }</td>
              <td>{contrib.duration}</td>
            </tr>
            );
        }, this);
    return (
        <div>
          <Navigation />
          <UserProfile user={this.state.user} />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              { contribs }
            </tbody>
          </Table>
          <div id="contrib-form">
          <Form inline>
            <Autocomplete
              inputProps={{name: "projects", id: "projects-autocomplete", className: "form-control", placeholder: "Project" }}
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
            <FormControl
              type="text"
              value={this.state.duration}
              onChange={e=>this.durationChange(e)}
              placeholder="Duration"
            />
            <Autocomplete
              inputProps={{name: "technologies", id: "techs-autocomplete", className: "form-control", placeholder: "Technology"}}
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

            {/*<ControlLabel>Description</ControlLabel>*/}
            <FormControl
              type="text"
              value={this.state.description}
              onChange={e=>this.descriptionChange(e)}
              placeholder="Description"
            />
            <Button bsStyle="primary" bsSize="small" onClick={()=>this.handleCreate()}>Add Contribution</Button>
            </Form>
          </div>
        </div>
      );

  }
}

export default User;
