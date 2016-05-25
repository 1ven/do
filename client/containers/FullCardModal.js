import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateCard } from '../actions/cardsActions';
import { hideModal } from '../actions/modalActions';
import FullCard from '../components/FullCard';

function mapStateToProps(state, ownProps) {
    return {
        data: state.entities.cards[ownProps.id]
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onInputFormSubmit: function(formData) {
            return dispatch(updateCard(ownProps.id, {
                text: formData.text
            }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullCard);
