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
  constructor() {
    super();
    this.state = {
      error: ''
    }
  }
  componentWillMount() {
    this.props.clearPoll();
  }

  componentDidMount() {
    this.props.fetchPoll(this.props.params.pollId);
  }

  handleFormSubmit({ option, addOption }) {
    const answer = {};
    const { pollId } = this.props.params;
    let url;

    if (addOption) {
      answer['option'] = { "text": addOption };
    } else if (option) {
      answer['option'] = { "id": option };
    }

    if (!this.props.authenticated) {
      url = `http://localhost:3000/api/unauth/polls/${pollId}`;
    } else {
      url = `http://localhost:3000/api/polls/${pollId}`;
    }

    const config = {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    };

    axios.post(url, answer, config)
      .then(response => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        } else {
          this.setState({ error: '' });
          this.props.fetchPoll(pollId);
          browserHistory.push(`/polls/${pollId}?results=true`);
        }
      });
  }

  renderAddOption() {
    if (this.props.authenticated) {
      return (
        <div>
          <span>You can add another option: </span>
          <Field
            name="addOption"
            component="input"
            type="text"
            placeholder="Enter your choice"
          />
          </div>
      );
    }

    return null;
  }

  render() {
    const { poll, handleSubmit } = this.props;

    if (!poll) {
      return <div>Loading...</div>;
    }

    const options = poll.options.map((option) => {
      return (
        <div key={option.optionId}>
          <Field name="option" component="input" type="radio" value={`${option.optionId}`} />
          { `${option.text}  -  ${option.voteCount}` }
        </div>
      );
    });

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div>
            <h1>{poll.question}</h1>
            {options}
            {this.renderAddOption()}
          </div>
          {this.state.error && <div className="error">{this.state.error}</div>}
          <Button className="Poll__button" type="submit">VOTE</Button>
        </form>
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

export default connect(mapStateToProps, { fetchPoll, clearPoll })(reduxForm({
  form: 'vote_poll'
})(Poll));
