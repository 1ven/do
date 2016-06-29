import React, { PropTypes, Component } from 'react';
import { addModifiers } from '../utils';
import CardsContainer from '../containers/CardsContainer';
import MenuList from './MenuList';
import ToggleMenu from './ToggleMenu';

class List extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleRemoveClick() {
    const { onRemoveClick, data: { id } } = this.props;
    onRemoveClick(id);
  }

  handleEditClick() {
    const { onEditClick, data } = this.props;
    onEditClick(data.id);
  }

  render() {
    const { id, title, cards } = this.props.data;

    return (
      <div className="b-list">
        <div className="b-list__top">
          <span className="b-list__title">
            {title}
          </span>
          <div className="b-list__menu">
            <ToggleMenu menu={
              <MenuList
                modifiers={['sm']}
                items={[
                  { title: 'Edit', onClick: this.handleEditClick },
                  { title: 'Remove', onClick: this.handleRemoveClick },
                ]}
              />
            } />
          </div>
        </div>
        <div className="b-list__body">
          <CardsContainer
            listId={id}
            boardId={this.props.boardId}
            cardsIds={cards}
          />
        </div>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.array,
  }),
  boardId: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default List;
