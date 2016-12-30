import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import {
  fetchPoll,
  clearPoll
} from '../actions';

class Poll extends Component {
  componentWillMount() {
    this.props.clearPoll();
  }

  componentDidMount() {
    this.props.fetchPoll(this.props.params.pollId);
  }
  render() {
    if (!this.props.poll) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.props.poll.question}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    poll: state.poll.poll,
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { fetchPoll, clearPoll })(Poll);
