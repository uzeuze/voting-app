import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { showAuthModal } from '../actions';

import AuthModal from './AuthModal';

class Header extends Component {
  constructor() {
    super();
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showSignUpModal = this.showSignUpModal.bind(this);
  }

  showLoginModal() {
    this.props.showAuthModal('login');
  }

  showSignUpModal() {
    this.props.showAuthModal('signUp');
  }

  renderNavLinks() {
    if (this.props.authenticated) {
      return (
        <Nav pullRight>
          <LinkContainer to="/">
            <NavItem eventKey={1}>Polls</NavItem>
          </LinkContainer>
          <LinkContainer to="/dashboard">
            <NavItem eventKey={2}>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to="/signout">
            <NavItem eventKey={3}>Sign Out</NavItem>
          </LinkContainer>
        </Nav>
      );
    }

    return (
      <Nav pullRight>
        <NavItem eventKey={1} onClick={this.showSignUpModal}>Sign Up</NavItem>
        <NavItem eventKey={2} onClick={this.showLoginModal}>Login</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <div>
        <Navbar className="Header">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">VOTING APP</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.renderNavLinks()}
          </Navbar.Collapse>
        </Navbar>

        <AuthModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { showAuthModal })(Header);
