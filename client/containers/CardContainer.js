import { connect } from 'react-redux';
import pick from 'lodash/pick';
import modalsNames from '../constants/modalsNames';
import { removeCard } from '../actions/cardsActions';
import { showModal } from '../actions/modalActions';
import { makeGetCard } from '../selectors/cardsSelectors';
import Card from '../components/Card';

function makeMapStateToProps() {
  const getCard = makeGetCard();
  return (state, { cardId }) => {
    return getCard(state, { id: cardId });
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onRemoveClick(cardId) {
      const { boardId, listId } = ownProps;

      dispatch(
        showModal(modalsNames.CONFIRM, {
          title: 'Remove card?',
          onConfirm() {
            dispatch(removeCard.request({
              boardId,
              listId,
              cardId,
            }));
          },
        })
      );
    },
  };
}
export default connect(makeMapStateToProps, mapDispatchToProps)(Card);
