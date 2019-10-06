import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormData from '../FormData';
import Result from '../Result';

class ComCalc extends Component {
  render() {
    return (
      <div>
        <h3 className='mb-5'>
          Fill out the the required fields below to find out if it's better to
          commute or live close to your work/school!
        </h3>
        <FormData
          formData={this.props.formData}
          formChange={this.props.formChange}
          formUpdate={this.props.formUpdate}
          formReset={this.props.formReset}
          formSubmit={this.props.formSubmit}
        />
        <div className='mt-3'></div>
        <Result data={this.props.formData.data} />
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
