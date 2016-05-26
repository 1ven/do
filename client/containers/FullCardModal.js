import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateCard, getCard } from '../actions/cardsActions';
import { hideModal } from '../actions/modalActions';
import FullCard from '../components/FullCard';

class FullCardContainer extends Component {
    componentWillMount() {
        this.props.loadCard();
    }

    render() {
        const { card, onEditCardFormSubmit } = this.props;
        return (
            <FullCard
                card={card}
                onEditCardFormSubmit={onEditCardFormSubmit}
            />
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        card: state.entities.cards[ownProps.id]
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onEditCardFormSubmit: function(formData) {
            return dispatch(updateCard(ownProps.id, {
                text: formData.text
            }));
        },
        loadCard: function () {
            return dispatch(getCard(ownProps.id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullCardContainer);
