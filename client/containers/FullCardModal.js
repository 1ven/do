import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import assign from 'lodash/assign';
import map from 'lodash/map';
import { connect } from 'react-redux'
import { updateCard, getCard, addCommentId } from '../actions/cardsActions';
import { createComment } from '../actions/commentsActions';
import FullCard from '../components/FullCard';
import Modal from '../components/Modal';

class FullCardModal extends Component {
    componentWillMount() {
        this.props.loadCard();

        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        const { boardId } = this.props.params;
        browserHistory.push(`/boards/${boardId}`);
    }

    render() {
        const {
            card,
            hideModal,
            onEditCardFormSubmit,
            onSendCommentSubmit
        } = this.props;

        return card ? (
            <Modal
                title="Card"
                hideModal={this.hideModal}
            >
                <FullCard
                    card={card}
                    onEditCardFormSubmit={onEditCardFormSubmit}
                    onSendCommentSubmit={onSendCommentSubmit}
                />
            </Modal>
        ) : null;
    }
};

function mapStateToProps(state, ownProps) {
    const { cards, comments, users } = state.entities;
    const _card = cards[ownProps.params.cardId];;

    const card = _card ? assign({}, _card, {
        comments: map(_card.comments, id => {
            const comment = comments[id];
            return assign({}, comment, {
                user: users[comment.user]
            });
        })
    }) : null;

    return {
        card
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const cardId = ownProps.params.cardId;
    return {
        onEditCardFormSubmit: function(formData) {
            return dispatch(updateCard(cardId, {
                text: formData.text
            }));
        },
        onSendCommentSubmit: function (formData) {
            return dispatch(createComment(cardId, formData.text))
                .then(action => {;
                    if (!action.payload.error) {
                        dispatch(addCommentId(cardId, action.payload.result));
                    }
                });
        },
        loadCard: function () {
            return dispatch(getCard(cardId));
        }
    };
};

FullCardModal.propTypes = {
    onEditCardFormSubmit: PropTypes.func.isRequired,
    onSendCommentSubmit: PropTypes.func.isRequired,
    loadCard: PropTypes.func.isRequired,
    card: PropTypes.object,
    params: PropTypes.shape({
        id: PropTypes.string
    }).isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullCardModal);
