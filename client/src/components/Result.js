import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Result extends Component {
  render() {
    if (this.props.result)
      return <div>Response from server: {this.props.result.optimalCost}</div>;
    else return <div>&nbsp;</div>;
  }
}

Result.propTypes = {
  data: PropTypes.object
};

export default Result;
