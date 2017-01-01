import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
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
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">Polls</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/signout">Sign Out</Link></li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a onClick={this.showSignUpModal}>Sign Up</a></li>
        <li><a onClick={this.showLoginModal}>Login</a></li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        <nav className="Header navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#mainNavbar"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link to="/" className="navbar-brand">VOTING APP</Link>
            </div>
            <div className="collapse navbar-collapse" id="mainNavbar">
              {this.renderNavLinks()}
            </div>
          </div>
        </nav>

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
