import React, { PropTypes } from 'react';
import SignForm from './SignForm';
import Btn from './Btn';

function SignUp({ onSubmit, errors }) {
  return (
    <SignForm
      onSubmit={onSubmit}
      errors={errors}
      rows={[
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
        <Btn
          type="submit"
          tagName="button"
          modifiers={['full-width', 'blue']}
          text="Sign up"
        />,
      ]}
    />
  );
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

export default SignUp;
