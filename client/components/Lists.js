import React, { PropTypes } from 'react';
import DraggableList from './DraggableList';
import ListContainer from '../containers/ListContainer';
import Masonry from 'react-masonry-component';

function Lists({
  ids = [],
  boardId,
}) {
  return (
    <Masonry className="b-lists">
      {ids.map((id, i) => (
        <div
          key={id}
          className="b-lists__item"
        >
          <ListContainer
            boardId={boardId}
            listId={id}
          />
        </div>
      ))}
    </Masonry>
  );
}

Lists.propTypes = {
  ids: PropTypes.array,
  boardId: PropTypes.string.isRequired,
};

export default Lists;
