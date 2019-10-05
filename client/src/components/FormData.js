import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, FormGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

function FormData(props) {
  return (
    <Form onSubmit={props.formSubmit.bind(this)}>
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
      <Row form>
        <Col>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            endIcon={<SendIcon />}
          >
            Calculate
          </Button>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button
            type='reset'
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={props.formReset.bind(this)}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

FormData.propTypes = {
  formData: PropTypes.object,
  formChange: PropTypes.func,
  formUpdate: PropTypes.func,
  formReset: PropTypes.func,
  formSubmit: PropTypes.func
};

export default FormData;
