import React, { PropTypes } from 'react';
import BoardsListContainer from '../containers/BoardsListContainer';
import Notice from '../components/Notice';

const App = () => (
    <div className="b-container">
        <BoardsListContainer />
        <Notice onClick={() => {}} message="test" />
    </div>
);

export default App;
