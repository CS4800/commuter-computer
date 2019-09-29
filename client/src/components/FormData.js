import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export class FormData extends Component {
  getResults = () => {
    axios.post('/api/com-calc', this.props.formData).then(res => {
      this.props.formUpdate({ name: 'data', value: res.data });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <Label for='homeAddr'>Home Address</Label>
            <Input
              type='text'
              name='homeAddr'
              id='homeAddr'
              placeholder='Enter home address'
              value={this.props.formData.homeAddr}
              onChange={this.props.formChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='remoteAddr'>Remote Address</Label>
            <Input
              type='text'
              name='remoteAddr'
              id='remoteAddr'
              placeholder='Enter work or school address'
              value={this.props.formData.remoteAddr}
              onChange={this.props.formChange}
            />
          </FormGroup>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='income'>Income</Label>
                <Input
                  type='number'
                  name='income'
                  id='income'
                  value={this.props.formData.income}
                  onChange={this.props.formChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='homeCost'>Rent/Mortgage</Label>
                <Input
                  type='number'
                  name='homeCost'
                  id='homeCost'
                  value={this.props.formData.homeCost}
                  onChange={this.props.formChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for='workHours'>Work Hours</Label>
                <Input
                  type='number'
                  name='workHours'
                  id='workHours'
                  value={this.props.formData.workHours}
                  onChange={this.props.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Button onClick={this.getResults.bind(this)}>Submit</Button>
      </React.Fragment>
    );
  }
}

export default FormData;
