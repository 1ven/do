import React from 'react';
import RoundSpinner from './RoundSpinner';

function Loader() {
  console.log('render');
  return (
    <div className="b-loader">
      <RoundSpinner
        size="30px"
        color="#fff"
        thickness="3px"
      />
    </div>
  );
}

export default Loader;
