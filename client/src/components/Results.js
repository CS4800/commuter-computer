import React, { Component } from 'react';

export class Results extends Component {
  render() {
    if (this.props.hasResponse)
      return (
        <React.Fragment>
          <br />
          <div>Response from server: {this.props.data.optimalCost}</div>
        </React.Fragment>
      );
    else return <div></div>;
  }
}

export default Results;
