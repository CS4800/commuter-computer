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
      <Row form>
        <Col sm>
          <Row>
            <Col>
              <FormGroup>
                <TextField
                  id='homeAddr1'
                  name='homeAddr1'
                  label='Home Address'
                  type='text'
                  margin='dense'
                  fullWidth
                  autoFocus
                  required
                  value={props.formData.homeAddr1}
                  onChange={props.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <TextField
                  id='homeCost1'
                  name='homeCost1'
                  label='Rent/Mortgage'
                  type='number'
                  fullWidth
                  margin='dense'
                  value={props.formData.homeCost1}
                  onChange={props.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col sm>
          <Row>
            <Col>
              <FormGroup>
                <TextField
                  id='homeAddr2'
                  name='homeAddr2'
                  label='Second Home Address'
                  type='text'
                  margin='dense'
                  fullWidth
                  value={props.formData.homeAddr2}
                  onChange={props.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <TextField
                  id='homeCost2'
                  name='homeCost2'
                  label='Rent/Mortgage'
                  type='number'
                  fullWidth
                  margin='dense'
                  value={props.formData.homeCost2}
                  onChange={props.formChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row form>
        <Col sm>
          <FormGroup>
            <TextField
              id='remoteAddr'
              name='remoteAddr'
              label='Work Address'
              type='text'
              margin='dense'
              fullWidth
              required
              value={props.formData.remoteAddr}
              onChange={props.formChange}
            />
          </FormGroup>
        </Col>
        <Col sm>
          <Row form>
            <Col>
              <TextField
                id='startTime'
                name='startTime'
                label='Start Time'
                type='time'
                margin='dense'
                fullWidth
                required
                value={props.formData.startTime}
                onChange={props.formChange}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </Col>
            <Col>
              <TextField
                id='endTime'
                name='endTime'
                label='End Time'
                type='time'
                margin='dense'
                fullWidth
                required
                value={props.formData.endTime}
                onChange={props.formChange}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row form>
        <Col sm>
          <FormGroup>
            <TextField
              id='daysPerWeek'
              name='daysPerWeek'
              label='Work Days/Week'
              type='number'
              margin='dense'
              fullWidth
              required
              value={props.formData.daysPerWeek}
              onChange={props.formChange}
            />
          </FormGroup>
        </Col>
        <Col sm>
          <FormGroup>
            <TextField
              id='income'
              name='income'
              label='Income (per hour)'
              type='number'
              margin='dense'
              fullWidth
              required
              value={props.formData.income}
              onChange={props.formChange}
            />
          </FormGroup>
        </Col>
        <Col sm>
          <FormGroup>
            <TextField
              id='mpg'
              name='mpg'
              label='MPG'
              type='number'
              margin='dense'
              fullWidth
              required
              value={props.formData.mpg}
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
