import { connect } from 'react-redux';
import modalsNames from '../constants/modalsNames';
import DraggableList from '../components/DraggableList';
import { removeList, addCardId, removeCardId } from '../actions/listsActions';
import { showModal } from '../actions/modalActions';
import { moveCard } from '../actions/cardsActions';

function mapStateToProps(state, ownProps) {
  return state.entities.lists[ownProps.listId];
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onEditClick(listId) {
      dispatch(
        showModal(modalsNames.EDIT_LIST, { listId })
      );
    },

    onRemoveClick(listId) {
      dispatch(
        showModal(modalsNames.CONFIRM, {
          title: 'Remove list?',
          onConfirm() {
            dispatch(removeList.request({
              boardId: ownProps.boardId,
              listId,
            }));
          },
        })
      );
    },

    onCardMove(source, target) {
      dispatch(removeCardId(source.listId, source.cardId));
      dispatch(addCardId(target.listId, source.cardId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableList);
