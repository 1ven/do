import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateBoard } from '../actions/boardsActions';
import { hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class EditBoardModal extends Component {
    render() {
        const { board, onSubmit, onCancelClick } = this.props;

        return (
            <ModalForm
                rows={[
                    <Input
                        name="title"
                        placeholder="Title"
                        value={board.title}
                        focus={true}
                    />
                ]}
                onSubmit={onSubmit}
                onCancelClick={onCancelClick}
            />
        );
    }
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onCancelClick: function () {
            dispatch(hideModal());
        },
        onSubmit: function (formData) {
            dispatch(updateBoard(ownProps.board.id, formData))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(hideModal());
                    }
                });
        }
    };
};

EditBoardModal.propTypes = {
    board: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
};

export default connect(
    null,
    mapDispatchToProps
)(EditBoardModal);
