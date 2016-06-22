import React, { PropTypes, Component } from 'react';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import Cards from '../components/Cards';
import { removeCard } from '../actions/cardsActions';
import CreateCardModal from './modals/CreateCardModal';

class CardsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null,
    };

    this.handleCardRemoveClick = this.handleCardRemoveClick.bind(this);
    this.handleAddCardBtnClick = this.handleAddCardBtnClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ modal: null });
  }

  handleAddCardBtnClick() {
    this.setState({
      modal: {
        name: 'createCard',
      },
    });
  }

  handleCardRemoveClick(cardId) {
    this.props.dispatch(removeCard(cardId))
  }

  render() {
    const { cards, listId, boardId } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Cards
          cards={cards}
          onCardRemoveClick={this.handleCardRemoveClick}
          onAddCardBtnClick={this.handleAddCardBtnClick}
        />
        {modal && modal.name === 'createCard' ? (
          <CreateCardModal
            hideModal={this.hideModal}
            listId={listId}
            boardId={boardId}
          />
        ) : null}
      </div>
    );
  }
}

CardsContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { cards } = state.entities;
  const cardsIds = ownProps.cardsIds || [];

  return {
    cards: cardsIds.map(cardId => {
      const card = cards[cardId];
      const colors = card.colors.filter(c => c.active).map(c => c.color);
      return {
        ...pick(card, ['id', 'text', 'link']),
        colors,
      };
    }),
  };
}

export default connect(
  mapStateToProps
)(CardsContainer);
