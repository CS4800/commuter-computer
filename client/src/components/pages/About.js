import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class About extends Component {
  render() {
    let users = this.props.users;

    return (
      <React.Fragment>
        <h1>About</h1>
        <p>
          Commuter Computer web app will calculate the optimal cost between
          commuting vs local residence.
        </p>
        <p className='mt-5 text-center'>
          <h4>Team Members</h4>
        </p>
        {users &&
          users.map(user => (
            <Card className='mb-5'>
              <CardBody className='text-center'>
                <CardTitle className='font-weight-bold'>{user.name}</CardTitle>
                <CardSubtitle>{user.title}</CardSubtitle>
                <CardText>{user.description}</CardText>
              </CardBody>
            </Card>
          ))}
      </React.Fragment>
    );
  }
}

About.propTypes = {
  users: PropTypes.array
};

export default About;
