import React from 'react';
import { connect } from 'react-redux';
import Lists from '../components/Lists';

function mapStateToProps(state, ownProps) {
    const { lists } = state.entities;
    const { listsIds } = ownProps;

    return {
        lists: listsIds.map(id => lists[id])
    };
};

export default connect(mapStateToProps)(Lists);
