import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { addCardId } from '../actions/listsActions';
import { createCard } from '../actions/cardsActions';
import ModalForm from '../components/ModalForm';
import Modal from '../components/Modal';
import Input from '../components/Input';

class CreateCardModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onSubmit, hideModal } = this.props;

        return (
            <Modal
                title="Create card"
                hideModal={hideModal}
            >
                <ModalForm
                    rows={[
                        <Input
                            name="text"
                            placeholder="Text"
                            focus={true}
                        />
                    ]}
                    onSubmit={onSubmit}
                    onCancelClick={hideModal}
                />
            </Modal>
        )
    }
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            const { listId } = ownProps;

            dispatch(createCard(listId, formData.text))
                .then(action => {
                    if (!action.error) {
                        dispatch(addCardId(listId, action.payload.result));
                        ownProps.hideModal();
                    }
                });
        }
    }
}

CreateCardModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(CreateCardModal);
