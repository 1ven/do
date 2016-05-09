import React, { PropTypes } from 'react';
import InlineSVG from 'svg-inline-react';

const Icon = function ({ name }) {
    return (
        <InlineSVG
            src={require(`../stylesheet/icons/${name}.svg`)}
        />
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired
};

export default Icon;
