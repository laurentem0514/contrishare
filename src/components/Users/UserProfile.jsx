import React, { Component } from 'react';
import Navigation from '../Nav/Nav';
import Autocomplete from 'react-autocomplete';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import './User.css';


class UserProfile extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    if (!this.props.user){
      return (<div> loading... </div>);
    }

    return (
      <Grid>
        <Row className="profile">
          <Col xs={12} md={4}><Image src="images/avatarHar.jpg" alt="Harvey" rounded/></Col>
          <Col xs={12} md={8}><div> {this.props.user.name}</div></Col>
        </Row>
      </Grid>
      );

  }
}

export default UserProfile;
