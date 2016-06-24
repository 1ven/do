import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../forms/SignUpForm';
import { signUp } from '../../actions/signActions';

function SignUpPage({ dispatch }) {
  function handleSubmit(values) {
    return new Promise((resolve, reject) => {
      dispatch(signUp.request({ values, resolve, reject }));
    });
  }

  return (
    <SignUpForm
      onSubmit={handleSubmit}
    />
  );
}

export default connect()(SignUpPage);
