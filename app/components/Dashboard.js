import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { fetchUserPolls } from '../actions';
import { API_URL } from '../../config';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchUserPolls();
  }

  onDeletePoll(pollId) {
    axios.delete(`${API_URL}/polls/${pollId}`,
      {
        headers: { authorization: localStorage.getItem('token') }
      }
    )
      .then(() => {
        this.props.fetchUserPolls();
      });
  }

  renderPolls() {
    const polls = this.props.userPolls.map((poll) => {
      return (
        <li key={poll._id} className="Poll__item">
          <Link to={`/polls/${poll.slug}`}>{poll.question}</Link>
          {'  '}
          <a className="btn btn-danger" onClick={this.onDeletePoll.bind(this, poll.slug)}>Delete</a>
        </li>
      );
    });
    return polls;
  }

  render() {
    if (!this.props.userPolls) {
      return <div>Loading</div>;
    } else if (this.props.userPolls.length <= 0) {
      return (
        <div>
          <h3>You don't have any poll</h3>
          <Link to='/new-poll' className="btn btn-success">Create Your First Poll</Link>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-center">My Polls</h2>
        <ul>
          {this.renderPolls()}
        </ul>
        <Link to="/new-poll" className="Button_new_poll btn">
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userPolls: state.user.polls
  };
};

export default connect(mapStateToProps, { fetchUserPolls })(Dashboard);
