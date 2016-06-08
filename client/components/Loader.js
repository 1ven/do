import React from 'react';

function Loader() {
  console.log('render');
  return (
    <div className="b-loader">
      <div className="b-loader__spinner" />
    </div>
  );
}

export default Loader;
