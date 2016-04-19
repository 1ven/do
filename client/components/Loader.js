import React, { PropTypes } from 'react';

const Loader = ({ children }) => {
    console.log('render');
    return (
        <div className="c-loader">
            Loading...
        </div>
    );
};

export default Loader;
