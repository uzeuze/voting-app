import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';
import { fetchUserPolls } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchUserPolls();
  }

  onDeletePoll(pollId) {
    axios.delete(`http://localhost:3000/api/polls/${pollId}`,
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
        <li key={poll._id}>
          <Link to={`/polls/${poll.slug}`}>{poll.question}</Link>
          {'  '}
          <a onClick={this.onDeletePoll.bind(this, poll.slug)}>Delete</a>
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
        <ul>
          {this.renderPolls()}
        </ul>
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
