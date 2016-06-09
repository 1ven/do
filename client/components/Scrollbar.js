import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function Scrollbar({ children }) {
  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
    >
      {children}
    </Scrollbars>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Scrollbar;
