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
        const { id, title, fullCards } = this.props;
        return (
            <List
                id={id}
                title={title}
                cards={fullCards}
            />
        );
    }
};

function mapStateToProps(state, ownProps) {
    const { cards } = state.entities;
    const cardsIds = ownProps.cards;

    let fullCards = [];

    if (!isEmpty(cards) && !isEmpty(cardsIds)) {
        fullCards = map(cardsIds, id => cards[id]);
    };

    return {
        fullCards
    };
}

ListContainer.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ),
    fullCards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    })).isRequired
};

export default connect(mapStateToProps)(ListContainer);
