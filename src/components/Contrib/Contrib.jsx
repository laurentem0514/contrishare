import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Autocomplete from 'react-autocomplete';
//import './Contrib.css';


class Contrib extends Component {
  constructor() {
    super();
    this.state = {
        userName: '',
        projectName: '',
        duration: '',
        techSearch: '',
        searchTechId: '',
        description: '',
        technologies: []

    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  userNameChange(e){
    this.setState({userName: e.target.value});
  }

  projectNameChange(e){
    this.setState({projectName: e.target.value});
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

    fetch('http://localhost:3000/api/contrib',
      {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ userName : this.state.userName,
                               projectName : this.state.projectName,
                               duration: this.state.duration,
                               technology: this.state.techSearch,
                               description: this.state.description

        })
    })
    .then(r => r.json())
    .then((data) => {
      //this.context.router.push('/contrib');
      })
    .catch(err => console.log('Error: ',err));
  }

  render() {

    return (
        <div>
          <Nav />
          <div id="contrib-form">
            <h4>Add New Contribution</h4>
            <div>Name
              <input
                type="text"
                value={this.state.userName}
                onChange={e=> this.userNameChange(e)}
              />
            </div>
            <div>Project Name
              <input
                type="text"
                value={this.state.projectName}
                onChange={e=>this.projectNameChange(e)}
              />
            </div>
            <div>Duration
              <input
                type="text"
                value={this.state.duration}
                onChange={e=>this.durationChange(e)}
              />
            </div>

            <div>Technology
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
            </div>
            <div>Description
              <input
                type="text"
                value={this.state.description}
                onChange={e=>this.descriptionChange(e)}
              />
            </div>
            <button onClick={()=>this.handleCreate()}>Add</button>
          </div>
        </div>
      );

  }
}

export default Contrib;
