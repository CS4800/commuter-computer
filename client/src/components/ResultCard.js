import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import { CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red, green, grey } from '@material-ui/core/colors';

class ResultCard extends Component {
  itemStyle = status => {
    let colorCode = {
      default: grey[800],
      '-': red[400],
      '+': green[400]
    };

    return { color: status ? colorCode[status] : colorCode['default'] };
  };

  render() {
    return (
      <Spring
        from={{ opacity: 0, marginLeft: -500 }}
        to={{ opacity: 1, marginLeft: 0 }}
      >
        {props => (
          <div style={props}>
            <Card className='mb-3'>
              <CardHeader tag='h6' className='text-center'>
                {this.props.result.title}
              </CardHeader>
              <CardContent
                className='text-right'
                style={{ padding: 0, margin: 0 }}
              >
                <div
                  style={{ padding: '.75rem 1.25rem' }}
                  className='text-center'
                >
                  {this.props.result.body}
                </div>
                <ListGroup flush>
                  {this.props.result.costs.map((v, i) => (
                    <ListGroupItem key={i} style={{ border: 'none' }}>
                      <span style={this.itemStyle(v.status)}>
                        {v.name}: {v.value}
                      </span>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>{this.props.result.total}</ListGroupItem>
                </ListGroup>
              </CardContent>
            </Card>
          </div>
        )}
      </Spring>
    );
  }
}

ResultCard.propTypes = {
  result: PropTypes.object
};

export default ResultCard;
