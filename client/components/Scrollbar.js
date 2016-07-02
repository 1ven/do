import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function Scrollbar({ children, onScroll }) {
  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Scrollbar;
