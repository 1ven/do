import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FormBox from '../../components/FormBox';
import Modal from '../../components/Modal';
import InputBox from '../../components/InputBox';
import { updateBoard } from '../../actions/boardsActions';
import { hideModal } from '../../actions/modalActions'; 

function EditBoardModal({ dispatch, board }) {
  return (
    <Modal
      title="Edit board"
      onCloseClick={() => dispatch(hideModal())}
    >
      <FormBox
        request={formData => dispatch(
          updateBoard.request({
            id: board.id,
            props: formData,
            params: {
              validate: true,
            },
          })
        )}
        onCancelClick={() => dispatch(hideModal())}
        rows={[
          <InputBox
            name="title"
            title="Title"
            placeholder="Enter board title"
            value={board.title}
          />,
        ]}
      />
    </Modal>
  );
}

// TODO: may be get `board` from entities by given
// id(from `ownProps.boardId`) instead of `ownProps.board`.
// May be not pass `board` to <EditBoardModal />, pass only `boardId`.
// Because data from props may be stale. In entities data always will be fresh.
// But specifically in this case it's not necessary.

EditBoardModal.propTypes = {
  boardId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    board: state.entities.boards[ownProps.boardId],
  };
}

export default connect(
  mapStateToProps
)(EditBoardModal);
