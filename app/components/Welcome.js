import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { showAuthModal } from '../actions';
import PollList from './PollList';

class Welcome extends Component {
  showSignUpModal() {
    this.props.showAuthModal('signUp');
  }

  renderWelcomeHero() {
    if (!this.props.authenticated) {
      return (
        <div className="Welcome__hero_overlay">
          <div className="Welcome_hero_main_info text-center">
            <h1 className="Welcome__hero_title">FREE & INSTANT POLLS</h1>
            <p className="Welcome__hero_subtitle">
              Create and publish online polls quickly and easily.
            </p>
            <Button
              onClick={this.showSignUpModal.bind(this)}
              className="Welcome__hero_button"
            >
              GET STARTED
            </Button>
          </div>
          <div className="Welcome__featured_poll_container">
            <h4 className="text-center Welcome__featured_poll_title">Featured Poll</h4>
            <div className="Welcome__featured_poll">
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__hero">
          {this.renderWelcomeHero()}
        </div>
        <div className="text-center">
          <h2>ALL POLLS</h2>
          <PollList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { showAuthModal })(Welcome);
