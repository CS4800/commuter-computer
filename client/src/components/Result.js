import React, { Component } from 'react';

class Result extends Component {
  render() {
    if (this.props.data)
      return <div>Response from server: {this.props.data.optimalCost}</div>;
    else return <div>&nbsp;</div>;
  }
}

export default Result;
