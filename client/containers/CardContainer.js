import { connect } from 'react-redux';
import pick from 'lodash/pick';
import modalsNames from '../constants/modalsNames';
import DraggableCard from '../components/DraggableCard';
import { removeCard, moveCard, moveCardSync, beginDrag, endDrag } from '../actions/cardsActions';
import { showModal } from '../actions/modalActions';

function mapStateToProps(state, { cardId }) {
  const card = state.entities.cards[cardId];
  const colors = card.colors.filter(c => c.active).map(c => c.color);
  return {
    ...card,
    colors,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onRemoveClick(cardId) {
      dispatch(removeCard(cardId));
    },

    onMove(source, target) {
      dispatch(
        moveCardSync(source, target)
      );
    },

    onEndDrag(sourceListId, targetListId) {
      dispatch(
        moveCard.request({ sourceListId, targetListId })
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DraggableCard);
