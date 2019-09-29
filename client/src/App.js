import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/layout/AppNavbar';
import About from './components/pages/About';
import ComCalc from './components/pages/ComCalc';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    formData: {
      homeAddr: '',
      remoteAddr: '',
      income: 0,
      homeCost: 0,
      workHours: 0,
      data: null
    }
  };

  formChange = e => {
    let { name, value } = e.target;

    // prevent NaN error when returning empty value to float type
    if (e.target.value === 'number' && !value) value = 0;

    this.formUpdate({ name: name, value: value });
  };

  formUpdate = (...values) => {
    let formData = this.state.formData;

    for (let i = 0; i < values.length; ++i) {
      const { name, value } = values[i];
      formData[name] = value;
    }

    this.setState({ formData: formData });
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <AppNavbar />
          <Container>
            <Switch>
              <Route path='/about'>
                <About/>
              </Route>
              <Route path='/'>
                <ComCalc
                  {...this.props}
                  formData={this.state.formData}
                  formChange={this.formChange}
                  formUpdate={this.formUpdate}
                />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
