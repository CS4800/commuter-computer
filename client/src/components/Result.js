import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import ResultCard from './ResultCard';

const mockupData = [
  {
    title: 'Location 1',
    list: [
      { status: '', name: 'rent', value: 10 },
      { status: '+', name: 'gasCost', value: 10 },
      { status: '-', name: 'opportunityCost', value: 10 }
    ],
    total: 'Total'
  },
  {
    title: 'Location 2',
    list: [
      { status: '', name: 'rent', value: 10 },
      { status: '+', name: 'gasCost', value: 10 },
      { status: '-', name: 'opportunityCost', value: 10 }
    ],
    total: 'Total'
  }
];

class Result extends Component {
  render() {
    if (this.props.result) {
      return (
        <React.Fragment>
          <div>Response from server: {this.props.result.optimalCost}</div>
          <Row form>
            {mockupData.map((d, i) => (
              <Col key={i} sm>
                <ResultCard data={d} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      );
    } else return <div>&nbsp;</div>;
  }
}

Result.propTypes = {
  result: PropTypes.object
};

export default Result;
