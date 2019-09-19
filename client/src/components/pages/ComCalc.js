import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Results from '../Results';

export class ComCalc extends Component {
  state = {
    homeAddr: '',
    remoteAddr: '',
    income: 0,
    homeCost: 0,
    workHours: 0,
    hasResponse: false,
    data: { optimalCost: '' }
  };

  formChange = e => {
    // prevent NaN error when returning empty value to float type
    var value = e.target.value;
    if (e.target.value === 'number' && !value) value = 0;

    this.setState({ [e.target.id]: value });
  };

  getResults = () => {
    axios.post('/api/com-calc', this.state).then(res => {
      this.setState({ hasResponse: true, data: res.data });
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3>
          Fill out the the required fields below to find out if it's better to
          commute or live close to your work/school!
        </h3>
        <br />
        <Form>
          <FormGroup>
            <Label for='homeAddr'>Home Address</Label>
            <Input
              type='text'
              name=''
              id='homeAddr'
              placeholder='Enter home address'
              value={this.state.homeAddr}
              onChange={this.formChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='remoteAddr'>Remote Address</Label>
            <Input
              type='text'
              name=''
              id='remoteAddr'
              placeholder='Enter work or school address'
              value={this.state.remoteAddr}
              onChange={this.formChange}
            />
          </FormGroup>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='income'>Income</Label>
                <Input
                  type='number'
                  name=''
                  id='income'
                  value={this.state.income}
                  onChange={this.formChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='homeCost'>Rent/Mortgage</Label>
                <Input
                  type='number'
                  name=''
                  id='homeCost'
                  value={this.state.homeCost}
                  onChange={this.formChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for='workHours'>Work Hours</Label>
                <Input
                  type='number'
                  name=''
                  id='workHours'
                  value={this.state.workHours}
                  onChange={this.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Button onClick={this.getResults.bind(this)}>Submit</Button>
        <br />
        <Results data={this.state.data} hasResponse={this.state.hasResponse} />
      </React.Fragment>
    );
  }
}

export default ComCalc;
