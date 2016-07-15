import React, { PropTypes } from 'react';
import Lists from './Lists';
import BottomBox from './BottomBox';
import Btn from './Btn';
import Icon from './Icon';

function Board({
  id,
  title,
  description,
  lists,
  onAddListBtnClick,
  onEditBoardClick,
}) {
  console.log('<Board />');
  return (
    <div>
      <div className="b-board">
        <div className="b-container">
          <div className="b-board__top">
            <div className="b-board__info">
              <span className="b-board__title">
                {title}
              </span>
              <span className="b-board__description">
                {description || 'No description'}
              </span>
            </div>
            <a
              className="b-board__edit"
              onClick={onEditBoardClick}
            >
              <Icon name="pencil" />
            </a>
          </div>
          <div className="b-board__lists">
            <Lists
              ids={lists}
              boardId={id}
            />
          </div>
        </div>
      </div>
      <BottomBox button={
        <Btn
          text="Add new list"
          onClick={onAddListBtnClick}
        />
      }/>
    </div>
  );
}

Board.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lists: PropTypes.arrayOf(
    PropTypes.string
  ),
  onAddListBtnClick: PropTypes.func.isRequired,
  onEditBoardClick: PropTypes.func.isRequired,
};

export default Board;
