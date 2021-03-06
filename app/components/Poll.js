import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';
import {
  fetchPoll,
  clearPoll,
  fetchFeaturedPoll
} from '../actions';
const {
  TwitterShareButton
} = ShareButtons;

const TwitterIcon = generateShareIcon('twitter');
import { API_URL, URL } from '../../config';

class Poll extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    };
  }
  componentWillMount() {
    this.props.clearPoll();
  }

  componentDidMount() {
    if (this.props.featured) {
      this.props.fetchFeaturedPoll();
    } else {
      this.props.fetchPoll(this.props.params.pollId);
    }
  }

  componentWillUnmount() {
    this.props.clearPoll();
  }

  handleFormSubmit({ option, addOption }) {
    const answer = {};
    const pollId = this.props.poll.slug;
    let url;

    if (addOption) {
      answer['option'] = { "text": addOption };
    } else if (option) {
      answer['option'] = { "id": option };
    }

    if (!this.props.authenticated) {
      url = `${API_URL}/unauth/polls/${pollId}`;
    } else {
      url = `${API_URL}/polls/${pollId}`;
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

    // Render results page if results query exists in url
    const pollData = [['Option', 'Vote Count']];
    this.props.poll.options.forEach((option) => {
      const optionArr = [option.text, option.voteCount];
      pollData.push(optionArr);
    });

    if (this.props.location && this.props.location.query.results) {
      return (
        <div>
          <h2 className="text-center">Thank you for voting!</h2>
          <h5 className="text-center">{this.props.poll.question}</h5>
          <div className="container">
            <Chart
              chartType="PieChart"
              data={pollData}
              options={{ 'is3D': true }}
              width="100%"
            />
          </div>
        </div>
      );
    }

    const options = poll.options.map((option) => {
      return (
        <div key={option.optionId}>
          <Field
            name="option"
            component="input"
            type="radio"
            value={`${option.optionId}`}
            className="Poll__options"
          />
          { option.text }
        </div>
      );
    });

    return (
      <Grid className="Poll">
        <Row className="show-grid">
          <Col sm={!this.props.featured ? 6 : 12}>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="Poll__form">
              <div>
                <h3 className="Poll__question">{poll.question}</h3>
                {options}
                {this.renderAddOption()}
              </div>
              {this.state.error && <div className="error">{this.state.error}</div>}
              <Button className="Poll__button btn btn-danger" type="submit">VOTE</Button>
            </form>
            { !this.props.featured ?
              <TwitterShareButton
                url={`${URL}/polls/${this.props.poll.slug}`}
                title={this.props.poll.question}
                className="twitter_share_button"
              >
                <TwitterIcon
                  size={40}
                  round
                />
              </TwitterShareButton>
              :
              null
            }
          </Col>
          { !this.props.featured ?
            <div className="container">
              <Col sm={6}>
                <Chart
                  chartType="PieChart"
                  data={pollData}
                  options={{ 'is3D': true }}
                  width="100%"
                  legend_toggle
                />
              </Col>
            </div>

            :
            null
          }
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    poll: state.poll.poll,
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { fetchPoll, clearPoll, fetchFeaturedPoll })(reduxForm({
  form: 'vote_poll'
})(Poll));
