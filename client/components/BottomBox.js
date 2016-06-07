import React, { PropTypes } from 'react';

function BottomBox({ button }) {
  return (
    <div className="b-bottom-box">
      <div className="b-container">
        <div className="b-bottom-box__button-wrap">
          {button}
        </div>
      </div>
    </div>
  );
}

BottomBox.propTypes = {
  button: PropTypes.node.isRequired,
};

export default BottomBox;
