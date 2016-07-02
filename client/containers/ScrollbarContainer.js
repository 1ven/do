import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

function ScrollbarContainer({ children }) {
  function handleScroll(e) {
    if ((window.innerHeight + e.target.scrollTop) >= e.target.scrollHeight) {
      console.log('bottom');
    }
  }

  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      onScroll={handleScroll}
    >
      {children}
    </Scrollbars>
  );
}

ScrollbarContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ScrollbarContainer);
