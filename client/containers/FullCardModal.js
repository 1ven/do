import React, { PropTypes, Component } from 'react';
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
    }

    render() {
        const {
            card,
            hideModal,
            onEditCardFormSubmit,
            onSendCommentSubmit
        } = this.props;
        return (
            <Modal
                title="Card"
                hideModal={hideModal}
            >
                <FullCard
                    card={card}
                    onEditCardFormSubmit={onEditCardFormSubmit}
                    onSendCommentSubmit={onSendCommentSubmit}
                />
            </Modal>
        );
    }
};

function mapStateToProps(state, ownProps) {
    const { cards, comments, users } = state.entities;
    const card = cards[ownProps.id];;

    return {
        card: assign({}, card, {
            comments: map(card.comments, id => {
                const comment = comments[id];
                return assign({}, comment, {
                    user: users[comment.user]
                });
            })
        })
    };
};

function mapDispatchToProps(dispatch, ownProps) {
    const cardId = ownProps.id;
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
    hideModal: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullCardModal);
