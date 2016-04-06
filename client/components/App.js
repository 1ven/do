import React, { PropTypes } from 'react';
import BoardsListContainer from '../containers/BoardsListContainer';
import NoticeContainer from '../containers/NoticeContainer';
import FullBoardContainer from '../containers/FullBoardContainer';

const App = () => (
    <div className="b-container">
        <BoardsListContainer />
        <NoticeContainer />
        <FullBoardContainer params={{ id: 3 }} />
    </div>
);

export default App;
