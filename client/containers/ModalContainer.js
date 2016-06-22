import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import modalsNames from '../constants/modalsNames';
import CreateBoardModal from './modals/CreateBoardModal';
import CreateListModal from './modals/CreateListModal';
import CreateCardModal from './modals/CreateCardModal';
import EditBoardModal from './modals/EditBoardModal';
import EditListModal from './modals/EditListModal';

function ModalContainer({ name, data }) {
  switch (name) {
    case modalsNames.CREATE_BOARD:
      return <CreateBoardModal {...data} />
    case modalsNames.CREATE_LIST:
      return <CreateListModal {...data} />
    case modalsNames.CREATE_CARD:
      return <CreateCardModal {...data} />
    case modalsNames.EDIT_BOARD:
      return <EditBoardModal {...data} />
    case modalsNames.EDIT_LIST:
      return <EditListModal {...data} />
    default:
      return <div />;
  }
}

ModalContainer.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
};

function mapStateToProps(state) {
  const { name, data } = state.modal;
  return { name, data };
}

export default connect(
  mapStateToProps
)(ModalContainer);
