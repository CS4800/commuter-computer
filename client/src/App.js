import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/layout/AppNavbar';
import About from './components/pages/About';
import ComCalc from './components/pages/ComCalc';
import Error404 from './components/pages/NotFound';
// import GoogleMap from './components/GoogleMap';
// import googleGeocoder from './modules/googleGeocoder';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  defaultFormData = {
    homeAddr1: '',
    homeAddr2: '',
    homeCost1: '',
    homeCost2: '',
    remoteAddr: '',
    startTime: '09:00',
    endTime: '17:00',
    income: '',
    daysPerWeek: '',
    mpg: '25'
  };

  state = {
    title: 'Commuter Computer',
    formData: _.cloneDeep(this.defaultFormData),
    coords: {
      cpp: { lat: 34.0589, lng: -117.8194 },
      center: { lat: 34.0589, lng: -117.8194, zoom: 13 }
    },
    users: null,
    results: null,
    suggestions: null,
    inProgress: false,
    stop: false
  };

  componentDidMount() {
    axios
      .get('/api/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(e => console.log(`Could not fetch About user's info: ${e}`));
  }

  // handle form change event
  formChange = e => {
    let { name, value } = e.target;

    // prevent NaN error when returning empty value to float type
    if (e.target.type === 'number' && !value) value = '';

    this.formUpdate({ name: name, value: value });
  };

  // update state.formData
  // @param {Object} values Variadic args of {name, value}
  formUpdate = (...values) => {
    let formData = this.state.formData;

    values.forEach(({ name, value }) => (formData[name] = value));
    this.setState({ formData: formData });
  };

  // clear state.formData and state.results
  formReset = e => {
    this.setState({ formData: _.cloneDeep(this.defaultFormData) });
    this.setState({
      results: null,
      suggestions: null,
      stop: true,
      inProgress: false
    });
  };

  // handle form submit event
  formSubmit = e => {
    e.preventDefault();

    this.setState({
      results: null,
      suggestions: null,
      inProgress: true,
      stop: false
    });

    axios.post('/api/com-calc', this.state.formData).then(res => {
      if (!this.state.stop) {
        this.setState({
          results: res.data.results,
          suggestions: res.data.suggestions,
          inProgress: false
        });
      }
    });

    // let addrs = [this.state.formData.homeAddr, this.state.formData.remoteAddr];
    // Promise.all(addrs.map(addr => googleGeocoder(addr))).then(coords => {
    //   this.formUpdate(
    //     { name: 'homeCoord', value: coords[0] },
    //     { name: 'remoteCoord', value: coords[1] }
    //   );
    // });
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <AppNavbar title={this.state.title} />
          <Container>
            <Switch>
              <Route path='/about' exact>
                <About users={this.state.users} />
              </Route>
              <Route path='/' exact>
                <ComCalc
                  {...this.props}
                  formData={this.state.formData}
                  formChange={this.formChange}
                  formUpdate={this.formUpdate}
                  formReset={this.formReset}
                  formSubmit={this.formSubmit}
                  inProgress={this.state.inProgress}
                  results={this.state.results}
                  suggestions={this.state.suggestions}
                />
                <div className='mt-5'></div>
                {/* <GoogleMap coords={this.state.coords} /> */}
              </Route>
              <Route component={Error404} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
