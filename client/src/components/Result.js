import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import ResultCard from './ResultCard';

class Result extends Component {
  render() {
    if (this.props.results && this.props.results.length) {
      let results = this.props.results;

      return (
        <React.Fragment>
          <Row form>
            {results.map((result, i) => (
              <Col key={i} sm>
                <ResultCard result={result} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      );
    } else return <div>&nbsp;</div>;
  }
}

Result.propTypes = {
  results: PropTypes.array
};

export default Result;
