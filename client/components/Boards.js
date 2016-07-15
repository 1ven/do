import React, { PropTypes } from 'react';
import { addModifiers } from '../utils';
import BoardTileContainer from '../containers/BoardTileContainer';
import BoardsSpinner from './BoardsSpinner';

function Boards({
  ids = [],
  spinner,
  error,
}) {
  return (
    <div className="b-boards">
      {error ? (
        <div className="b-boards__message">
          Error loading boards.
        </div>
      ) : !ids.length ? (
        <div className="b-boards__message">
          Boards not found.
        </div>
      ) : (
        <div className="b-boards__items">
          {ids.map((id, i) =>
            <div
              className="b-boards__item"
              key={id}
            >
              <BoardTileContainer id={id} />
            </div>
          )}
        </div>
      )}
      {spinner ? (
        <div className="b-boards__spinner">
          <BoardsSpinner />
        </div>
      ) : <div />}
    </div>
  );
}

Boards.propTypes = {
  ids: PropTypes.array.isRequired,
  spinner: PropTypes.bool,
  error: PropTypes.bool,
};

export default Boards;
