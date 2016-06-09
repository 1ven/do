import React, { PropTypes } from 'react';
import List from './List';
import Masonry from 'react-masonry-component';

function Lists({
  lists = [],
  onListRemoveClick,
  onListEditClick,
}) {
  return (
    <Masonry className="b-lists">
      {lists.map((list, i) => (
        <div
          key={i}
          className="b-lists__item"
        >
          <List
            data={list}
            onRemoveClick={onListRemoveClick}
            onEditClick={onListEditClick}
          />
        </div>
      ))}
    </Masonry>
  );
}

Lists.propTypes = {
  lists: PropTypes.array,
  onListRemoveClick: PropTypes.func.isRequired,
  onListEditClick: PropTypes.func.isRequired,
};

export default Lists;
