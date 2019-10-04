import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/layout/AppNavbar';
import About from './components/pages/About';
import ComCalc from './components/pages/ComCalc';
import GoogleMap from './components/GoogleMap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    formData: {
      homeAddr: '',
      remoteAddr: '',
      income: '',
      homeCost: '',
      workHours: '',
      data: null
    },
    coords: {
      cpp: { lat: 34.0589, lng: -117.8194 },
      center: { lat: 34.0589, lng: -117.8194, zoom: 13 }
    }
  };

  formChange = e => {
    let { name, value } = e.target;

    // prevent NaN error when returning empty value to float type
    if (e.target.type === 'number' && !value) value = '';

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
                <About />
              </Route>
              <Route path='/'>
                <ComCalc
                  {...this.props}
                  formData={this.state.formData}
                  formChange={this.formChange}
                  formUpdate={this.formUpdate}
                />
                <div className='mt-5'></div>
                <GoogleMap coords={this.state.coords} />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
