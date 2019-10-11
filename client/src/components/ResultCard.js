import React, { Component } from 'react';
import { CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const mockupData = {
  title: 'Location 1',
  list: ['rent', 'gasCost', 'opportunityCost'],
  total: 'Total'
};

class ResultBreakDown extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader tag='h5' className='text-center'>
            {mockupData.title}
          </CardHeader>
          <CardContent className='text-right' style={{ padding: 0, margin: 0 }}>
            <ListGroup flush>
              {mockupData.list.map(v => (
                <ListGroupItem style={{ border: 'none' }}>{v}</ListGroupItem>
              ))}
              <ListGroupItem>{mockupData.total}</ListGroupItem>
            </ListGroup>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default ResultBreakDown;
