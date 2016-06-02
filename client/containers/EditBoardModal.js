import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateBoard } from '../actions/boardsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import Input from '../components/Input';

class EditBoardModal extends Component {
    render() {
        const { board, onSubmit, hideModal } = this.props;

        return (
            <Modal
                title="Edit board"
                hideModal={hideModal}
            >
                <FormBox
                    rows={[
                        <Input
                            name="title"
                            placeholder="Title"
                            value={board.title}
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

// TODO: may be get `board` from entities by given id(from `ownProps.boardId`) instead of `ownProps.board`.
// May be not pass `board` to <EditBoardModal />, pass only `boardId`.
// Because data from props may be stale. In entities data always will be fresh.
// But specifically in this case it's not necessary.

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(updateBoard(ownProps.board.id, formData))
                .then(action => {
                    if (!action.payload.error) {
                        ownProps.hideModal();
                    }
                });
        }
    };
};

EditBoardModal.propTypes = {
    board: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default connect(
    null,
    mapDispatchToProps
)(EditBoardModal);
