import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import AppNavbar from './components/layout/AppNavbar';
import CommCalc from './components/pages/CommCalc';
import About from './components/pages/About';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <AppNavbar />
          <Container>
            <Route exact path='/' render={props => <CommCalc />} />
            <Route exact path='/about' component={About} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
