import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Btn from '../../components/Btn';
import SignRow from '../../components/SignRow';

function SignUpForm({
  fields,
  submitting,
  handleSubmit,
}) {
  const rows = [
    <input
      className="b-input-a"
      type="text"
      placeholder="Username"
      name="username"
    />,
    <input
      className="b-input-a"
      type="text"
      placeholder="Email"
      name="email"
    />,
    <input
      className="b-input-a"
      type="password"
      placeholder="Password"
      name="password"
    />,
    <input
      className="b-input-a"
      type="password"
      placeholder="Confirmation"
      name="confirmation"
    />,
  ];
  return (
    <form
      className="b-sign-form"
      onSubmit={handleSubmit}
    >
      {rows.map((row, i) => {
        const value = fields[row.props.name];
        return (
          <SignRow
            key={i}
            error={value.error && value.touched ? value.error : null}
          >
            {React.cloneElement(row, { ...value })}
          </SignRow>
        );
      })}
      <SignRow>
        <Btn
          type="submit"
          tagName="button"
          modifiers={['full-width', 'blue']}
          text="Sign up"
          spinner={submitting}
        />
      </SignRow>
    </form>
  );
}

const validateUsername = username => {
  if (!username || !username.length) {
    return 'Username is required';
  }

  if (username.length < 3 || username.length > 20) {
    return 'Must be between 3 and 20 characters long';
  }

  if (!username.match(/^\S*$/g)) {
    return 'Must not contain spaces';
  }
};

const validateEmail = email => {
  if (!email || !email.length) {
    return 'Email is required';
  }

  if (!email.match(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/g)) {
    return 'Invalid email';
  }
};

const validatePassword = password => {
  if (!password || !password.length) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Must be at least 6 characters long';
  }
};

const validateConfirmation = (confirmation, password) => {
  if (!confirmation || !confirmation.length) {
    return 'Password confirmation is required';
  }

  if (confirmation !== password) {
    return 'Passwords not match';
  }
};

function validate(values) {
  return {
    username: validateUsername(values.username),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmation: validateConfirmation(values.confirmation, values.password),
  };
}

export default reduxForm({
  form: 'sign-up',
  fields: ['username', 'email', 'password', 'confirmation'],
  validate,
})(SignUpForm);
