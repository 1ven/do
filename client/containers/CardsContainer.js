import React from 'react';
import { connect } from 'react-redux';
import Cards from '../components/Cards';

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const { cardsIds } = ownProps;

    return {
        cards: cardsIds.map(id => cards[id])
    };
};

export default connect(mapStateToProps)(Cards);
