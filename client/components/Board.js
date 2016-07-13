import React, { PropTypes } from 'react';
import Lists from './Lists';
import BottomBox from './BottomBox';
import Btn from './Btn';
import Icon from './Icon';

function Board({
  data,
  onAddListBtnClick,
  onEditBoardClick,
}) {
  return (
    <div>
      <div className="b-board">
        <div className="b-container">
          <div className="b-board__top">
            <div className="b-board__info">
              <span className="b-board__title">
                {data.title}
              </span>
              <span className="b-board__description">
                {data.description || 'No description'}
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
              ids={data.lists}
              boardId={data.id}
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
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    lists: PropTypes.arrayOf(
      PropTypes.string
    ),
  }).isRequired,
  onAddListBtnClick: PropTypes.func.isRequired,
  onEditBoardClick: PropTypes.func.isRequired,
};

export default Board;
