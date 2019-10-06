import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Result extends Component {
  render() {
    if (this.props.data)
      return <div>Response from server: {this.props.data.optimalCost}</div>;
    else return <div>&nbsp;</div>;
  }
}

Result.propTypes = {
  data: PropTypes.object
};

export default Result;
