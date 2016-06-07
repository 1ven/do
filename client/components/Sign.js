import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Sign({ children }) {
  return (
    <div className="b-sign">
      <div className="b-sign__middle">
        <div className="b-sign__nav">
          <Link
            className="b-sign__nav-link"
            activeClassName="b-sign__nav-link_active"
            to="/sign-in"
          >
            Sign in
          </Link>
          <Link
            className="b-sign__nav-link"
            activeClassName="b-sign__nav-link_active"
            to="/sign-up"
          >
            Sign up
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

Sign.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sign;
