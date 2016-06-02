import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createBoard } from '../actions/boardsActions';
import ModalForm from '../components/ModalForm';
import Modal from '../components/Modal';
import Input from '../components/Input';

class CreateBoardModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onSubmit, hideModal } = this.props;

        return (
            <Modal
                title="Create board"
                hideModal={hideModal}
            >
                <ModalForm
                    rows={[
                        <div>
                            <span className="b-modal-form__row-title">
                                Title
                            </span>
                            <Input
                                name="title"
                                placeholder="Enter board title"
                                focus={true}
                            />
                        </div>
                    ]}
                    onSubmit={onSubmit}
                    onCancelClick={hideModal}
                />
            </Modal>
        );
    }
};

CreateBoardModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(createBoard(formData.title))
                .then(action => {
                    if (!action.payload.error) {
                        ownProps.hideModal();
                    }
                });
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateBoardModal);
