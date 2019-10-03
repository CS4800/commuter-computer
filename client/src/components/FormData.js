import React from 'react';
import { Col, Row, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export function FormData(props) {
  const getResults = e => {
    e.preventDefault();
    axios.post('/api/com-calc', props.formData).then(res => {
      props.formUpdate({ name: 'data', value: res.data });
    });
  };

  return (
    <React.Fragment>
      <Form>
        <FormGroup>
          <TextField
            type='text'
            id='homeAddr'
            label='Home Address'
            name='homeAddr'
            fullWidth
            margin='dense'
            autoFocus
            required
            value={props.formData.homeAddr}
            onChange={props.formChange}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type='text'
            id='remoteAddr'
            label='Work Address'
            name='remoteAddr'
            fullWidth
            margin='dense'
            required
            value={props.formData.remoteAddr}
            onChange={props.formChange}
          />
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <TextField
                type='number'
                id='income'
                label='Income'
                name='income'
                fullWidth
                margin='dense'
                required
                value={props.formData.income}
                onChange={props.formChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <TextField
                type='number'
                id='homeCost'
                label='Rent/Mortgage'
                name='homeCost'
                fullWidth
                margin='dense'
                required
                value={props.formData.homeCost}
                onChange={props.formChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <TextField
                type='number'
                id='workHours'
                label='Work Hours'
                name='workHours'
                fullWidth
                margin='dense'
                required
                value={props.formData.workHours}
                onChange={props.formChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={getResults.bind(this)}
        >
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default FormData;
