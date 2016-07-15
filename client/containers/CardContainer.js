import { connect } from 'react-redux';
import pick from 'lodash/pick';
import modalsNames from '../constants/modalsNames';
import DraggableCard from '../components/DraggableCard';
import { removeCard, moveCard, moveCardSync, beginDrag, endDrag } from '../actions/cardsActions';
import { showModal } from '../actions/modalActions';
import { makeGetCard } from '../selectors/cardsSelectors';

function makeMapStateToProps() {
  const getCard = makeGetCard();
  return (state, { cardId }) => {
    return getCard(state, { id: cardId });
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
export default connect(makeMapStateToProps, mapDispatchToProps)(DraggableCard);
