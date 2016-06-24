import React, { PropTypes } from 'react';

function SignRow({ children, error }) {
  return (
    <div className="b-sign-form__row">
      {children}
      {error ? (
        <span className="b-sign-form__error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

SignRow.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

export default SignRow;
