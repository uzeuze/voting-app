import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchAllPolls } from '../actions';

class PollList extends Component {
  componentWillMount() {
    this.props.fetchAllPolls();
  }

  render() {
    if (!this.props.polls) {
      return <div>Loading...</div>;
    } else if (this.props.polls.length <= 0) {
      return <div>No polls to display</div>;
    }
    
    const polls = this.props.polls.map(poll => {
      return (
        <li key={poll._id} className="PollList__list_item well">
          <Link to={`/polls/${poll.slug}`}>{poll.question}</Link>
        </li>
      );
    });

    return (
      <div className="PollList">
        <ul className="PollList__list">
          {polls}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    polls: state.poll.allPolls
  };
};

export default connect(mapStateToProps, { fetchAllPolls })(PollList);
