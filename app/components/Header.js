import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import AuthModal from './AuthModal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.handleModalHide();
    }
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
          modal="login"
          handleModalChange={this.handleModalChange}
        >
          <LoginForm />
        </AuthModal>
      );
    } else if (this.state.modal === 'signUp') {
      return (
        <AuthModal
          onHide={this.handleModalHide}
          show={this.state.modal === 'signUp'}
          modal="signUp"
          handleModalChange={this.handleModalChange}
        >
          <SignUpForm />
        </AuthModal>
      );
    }
  }

  renderNavLinks() {
    if (this.props.authenticated) {
      return (
        <Nav pullRight>
          <LinkContainer to='/signout'>
            <NavItem eventKey={1}>Sign Out</NavItem>
          </LinkContainer>
        </Nav>
      );
    }

    return (
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
    );
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
            {this.renderNavLinks()}
          </Navbar.Collapse>
        </Navbar>
        {this.renderAuthModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
