import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import ResultBreakDown from './ResultCard';

class Result extends Component {
  render() {
    if (this.props.result) {
      return (
        <React.Fragment>
          <div>Response from server: {this.props.result.optimalCost}</div>
          <Row form>
            <Col>
              <ResultBreakDown />
            </Col>
            <Col>
              <ResultBreakDown />
            </Col>
          </Row>
        </React.Fragment>
      );
    } else return <div>&nbsp;</div>;
  }
}

Result.propTypes = {
  data: PropTypes.object
};

export default Result;
