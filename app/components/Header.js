import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

import AuthModal from './AuthModal';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modal: null
    };
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showSignUpModal = this.showSignUpModal.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  showLoginModal() {
    this.setState({ modal: 'login' });
    this.renderAuthModal();
  }

  showSignUpModal() {
    this.setState({ modal: 'signUp' });
    this.renderAuthModal();
  }

  handleModalHide() {
    this.setState({ modal: null });
  }

  handleModalChange() {
    if (this.state.modal === 'login') {
      this.setState({ modal: 'signUp' });
    } else if (this.state.modal === 'signUp') {
      this.setState({ modal: 'login' });
    }
  }

  renderAuthModal() {
    if (this.state.modal === 'login') {
      return (
        <AuthModal
          onHide={this.handleModalHide}
          show={this.state.modal === 'login'}
          title="Login"
          handleModalChange={this.handleModalChange}
        />
      );
    } else if (this.state.modal === 'signUp') {
      return (
        <AuthModal
          onHide={this.handleModalHide}
          show={this.state.modal === 'signUp'}
          title="Sign Up"
          handleModalChange={this.handleModalChange}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar className="Header" collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">VOTING APP</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                onClick={this.showSignUpModal}
              >
                Sign Up
              </NavItem>
              <NavItem
                eventKey={2}
                onClick={this.showLoginModal}
              >
                Login
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.renderAuthModal()}
      </div>
    );
  }
}

export default Header;
