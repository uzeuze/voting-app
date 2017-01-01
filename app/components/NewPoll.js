import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import axios from 'axios';

const renderField = ({ input, label, type, key, meta: { touched, error } }) => (
  <div className="form-group" key={key}>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
);

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionCount: 4
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption() {
    this.setState({ optionCount: this.state.optionCount + 1 });
  }

  handleFormSubmit(formProps) {
    let question;
    const options = [];
    for (let key in formProps) {
      if (key === 'question') {
        question = formProps[key];
      } else {
        options.push(formProps[key]);
      }
    }

    axios.post('http://localhost:3000/api/polls', { question, options }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  render() {
    const { handleSubmit } = this.props;
    const options = [];
    const count = this.state.optionCount;
    for (let i = 0; i < count; i++) {
      options.push(
        <Field
          name={`option${i + 1}`}
          key={`option${i + 1}`}
          type="text"
          component={renderField}
          label={`Option ${i + 1}`}
        />
      );
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="question"
            type="text"
            component={renderField}
            label="Question"
          />
          {options}
          <button action="submit" className="btn btn-primary">Create Poll</button>
        </form>
        <button onClick={this.handleAddOption}>Add New Option</button>
      </div>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.question) {
    errors.question = 'Please enter a question';
  }

  return errors;
};

export default reduxForm({
  form: 'new-poll',
  validate
})(NewPoll);
