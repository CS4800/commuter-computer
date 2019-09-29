import React, { Component } from 'react';

export class Result extends Component {
  render() {
    if (this.props.data)
      return (
        <div className='mt-3'>
          Response from server: {this.props.data.optimalCost}
        </div>
      );
    else return <div></div>;
  }
}

export default Result;
