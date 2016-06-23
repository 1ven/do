import React, { PropTypes } from 'react';

function Spinner() {
  return (
    <div className="b-spinner">
      <div className="b-spinner__bounce b-spinner__bounce_1" />
      <div className="b-spinner__bounce b-spinner__bounce_2" />
      <div className="b-spinner__bounce b-spinner__bounce_3" />
    </div>
  );
}

export default Spinner;
