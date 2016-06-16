import React, { PropTypes } from 'react';

function TextInfo({ children }) {
  return (
    <div className="b-text-info">
      <div className="b-container">
        {children}
      </div>
    </div>
  );
}

TextInfo.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TextInfo;
