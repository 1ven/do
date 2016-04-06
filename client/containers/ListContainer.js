import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import List from '../components/List';

class ListContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, cards } = this.props;
        return (
            <List
                id={id}
                title={title}
                cards={cards}
            />
        );
    }
};

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const cardsIds = ownProps.cards;

    let cardsArray = [];

    if (!isEmpty(cards) && !isEmpty(cardsIds)) {
        cardsArray = map(cardsIds, id => cards[id]);
    };

    return {
        cards: cardsArray
    };
}

ListContainer.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};

export default connect(mapStateToProps)(ListContainer);
