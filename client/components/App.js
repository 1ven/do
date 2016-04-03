import React, { PropTypes } from 'react';
import BoardsListContainer from '../containers/BoardsListContainer';
import NoticeContainer from '../containers/NoticeContainer';

const App = () => (
    <div className="b-container">
        <BoardsListContainer />
        <NoticeContainer />
    </div>
);

export default App;
