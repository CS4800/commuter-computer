import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';
import { NavLink as RouterNavLInk } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand tag={RouterNavLInk} to='/'>
              <img src={logo} className='App-logo' alt='logo' width='40' />
              <span className='mr-2'>{'  '}</span>
              {this.props.title}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={RouterNavLInk} to='/about'>
                    About
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  title: PropTypes.string
};

export default AppNavbar;
