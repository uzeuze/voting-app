import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { showAuthModal } from '../actions';
import PollList from './PollList';
import Poll from './Poll';

class Welcome extends Component {
  showSignUpModal() {
    this.props.showAuthModal('signUp');
  }

  renderWelcomeHero() {
    if (!this.props.authenticated) {
      return (
        <div className="Welcome__hero">
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
                <Poll featured />
              </div>
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
        <div>
          {this.renderWelcomeHero()}
        </div>
        <div className="text-center">
          <h2>ALL POLLS</h2>
          <div className="container">
            <PollList />
          </div>
        </div>
        { this.props.authenticated ?
          <Link to="/new-poll" className="Button_new_poll btn">
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          </Link>
          :
          <a onClick={this.showSignUpModal.bind(this)} className="Button_new_poll btn">
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          </a>
        }
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
