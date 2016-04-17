import React, { PropTypes } from 'react';
import BoardTile from './BoardTile';
import BoardCreator from './BoardCreator';

const BoardsList = ({
    boards,
    onBoardCreatorSubmit,
    loading
}) => (
    <div className="b-container">
        <div className="c-boards-list">
            {
                !loading ?
                <div className="c-boards-list__items">
                    {boards.map((board, i) =>
                        <div
                            className="c-boards-list__item"
                            key={i}
                        >
                            <BoardTile
                                data={board}
                            />
                        </div>
                    )}
                    <div
                        className="c-boards-list__item"
                    >
                        <BoardCreator
                            onSubmit={onBoardCreatorSubmit}
                        />
                    </div>
                </div>
                :
                <div className="c-boards-list__loader">
                    Loading boards...
                </div>
            }
        </div>
    </div>
);

BoardsList.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onBoardCreatorSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

BoardsList.defaultProps = {
    loading: true
};

export default BoardsList;
