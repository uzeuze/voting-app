import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <input className="form-control" {...input} placeholder={label} type={type} />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

class SignUpForm extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          type="text"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="passwordConfirm"
          type="password"
          component={renderField}
          label="Password Confirmation"
        />
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  } else if (formProps.password.length < 6) {
    errors.password = 'Password should be at least 6 characters';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

export default reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);
