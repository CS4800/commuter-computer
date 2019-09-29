import React, { Component } from 'react';
import FormData from '../FormData';
import Result from '../Result';

export class ComCalc extends Component {
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
        />
        <Result data={this.props.formData.data} />
      </div>
    );
  }
}

export default ComCalc;
