import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createList } from '../actions/listsActions';
import { addListId, incListsLength } from '../actions/boardsActions';
import ModalForm from '../components/ModalForm';
import Modal from '../components/Modal';
import Input from '../components/Input';

class CreateListModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onSubmit, hideModal } = this.props;

        return (
            <Modal
                title="Edit list"
                hideModal={hideModal}
            >
                <ModalForm
                    rows={[
                        <Input
                            name="title"
                            placeholder="Title"
                            focus={true}
                        />
                    ]}
                    onSubmit={onSubmit}
                    onCancelClick={hideModal}
                />
            </Modal>
        );
    }
};

CreateListModal.propTypes = {
    boardId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
    const { boardId } = ownProps;

    return {
        onSubmit: function (formData) {
            dispatch(createList(boardId, formData.title))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(addListId(boardId, action.payload.result));
                        dispatch(incListsLength(boardId));
                        ownProps.hideModal();
                    }
                });
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateListModal);
