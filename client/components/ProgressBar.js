import React, { PropTypes } from 'react';

function ProgressBar({ progress }) {
  return (
    <span
      className="b-progress-bar"
      style={{
        width: `${progress}%`,
        opacity: progress === 100 ? 0 : 1,
      }}
    />
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
