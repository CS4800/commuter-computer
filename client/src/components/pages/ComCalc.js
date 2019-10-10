import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormData from '../FormData';
import Result from '../Result';

class ComCalc extends Component {
  render() {
    return (
      <div>
        <h3 className='mb-5'>Calculate your commute cost!</h3>
        <FormData
          formData={this.props.formData}
          formChange={this.props.formChange}
          formUpdate={this.props.formUpdate}
          formReset={this.props.formReset}
          formSubmit={this.props.formSubmit}
        />
        <div className='mt-3'></div>
        <Result result={this.props.result} />
      </div>
    );
  }
}

ComCalc.propTypes = {
  formData: PropTypes.object,
  formChange: PropTypes.func,
  formUpdate: PropTypes.func,
  formReset: PropTypes.func,
  formSubmit: PropTypes.func
};

export default ComCalc;
