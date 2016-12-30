import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar className="Header" collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">VOTING APP</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}>Login</NavItem>
          </Nav>        
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
