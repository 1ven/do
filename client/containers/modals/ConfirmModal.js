import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import Btn from '../../components/Btn';
import { hideModal } from '../../actions/modalActions'; 

function ConfirmModal({ title, onConfirm, dispatch }) {
  return (
    <Modal
      title={title}
      onClose={() => dispatch(hideModal())}
    >
      <div className="b-confirm">
        <div className="b-confirm__item">
          <Btn
            text="Yes"
            modifiers={['md']}
            onClick={onConfirm}
          />
        </div>
        <div className="b-confirm__item">
          <Btn
            text="No"
            modifiers={['md', 'red']}
            onClick={() => dispatch(hideModal())}
          />
        </div>
      </div>
    </Modal>
  );
}

ConfirmModal.defaultProps = {
  title: 'Are you sure?',
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ConfirmModal);
