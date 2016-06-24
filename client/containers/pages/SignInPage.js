import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignInForm from '../forms/SignInForm';
import { signIn } from '../../actions/signActions';

function SignInPage({ dispatch }) {
  function handleSubmit(values) {
    return new Promise((resolve, reject) => {
      dispatch(signIn.request({ values, resolve, reject }));
    });
  }

  return (
    <SignInForm
      onSubmit={handleSubmit}
    />
  );
}

export default connect()(SignInPage);
