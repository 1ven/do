import React, { PropTypes } from 'react';

function ProgressBar({ value }) {
  return (
    <span
      className="b-progress-bar"
      style={{
        width: `${value}%`,
        opacity: value === 100 || value === 0 ? 0 : 1,
        transition: value === 100 ? 'opacity 1s' : 'width .2s',
      }}
    />
  );
}



ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
