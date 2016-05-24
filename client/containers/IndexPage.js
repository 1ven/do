import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { getBoards, removeBoard } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import BottomBox from '../components/BottomBox';
import Btn from '../components/Btn';
import CreateBoardModal from './CreateBoardModal';
import EditBoardModal from './EditBoardModal';

import { createNotificationWithTimeout } from '../actions/notificationsActions';

class IndexPage extends Component {
    constructor(props) {
        super(props);

        this.handleAddBoardBtnClick = this.handleAddBoardBtnClick.bind(this);
        this.handleBoardTileEditClick = this.handleBoardTileEditClick.bind(this);
        this.handleBoardTileRemoveClick = this.handleBoardTileRemoveClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.boards.length) { this.props.dispatch(getBoards()); }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    handleAddBoardBtnClick() {
        this.props.dispatch(showModal(
            'Create board',
            <CreateBoardModal />
        ));
    }

    handleBoardTileEditClick(board) {
        this.props.dispatch(showModal(
            'Edit board',
            <EditBoardModal board={board} />
        ));
    }

    handleBoardTileRemoveClick(id) {
        this.props.dispatch(removeBoard(id));
    }

    render() {
        const {
            boards,
            isFetching,
            lastUpdated,
            dispatch
        } = this.props;

        const isEmpty = boards.length === 0;

        const addBoardBtn = (
            <Btn
                text="Add new board"
                onClick={this.handleAddBoardBtnClick}
            />
        );

        return (
            <div>
                {isFetching || (!lastUpdated && isEmpty) ? (
                    <Loader />
                ) : isEmpty ? (
                    <div>No result.</div>
                ) : (
                    <BoardsList
                        boards={boards}
                        onBoardTileRemoveClick={this.handleBoardTileRemoveClick}
                        onBoardTileEditClick={this.handleBoardTileEditClick}
                    />
                )}
                <BottomBox
                    button={addBoardBtn}
                />
            </div>
        );
    }
}

IndexPage.propTypes = {
    boards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
};

function mapStateToProps(state) {
    const { boards, lists } = state.entities;
    const { ids, isFetching, lastUpdated } = state.pages.index;

    const items = ids.map(id => {
        const board = boards[id];
        const stats = getBoardStats(board, state);

        return _.assign({}, board, stats);
    }, []);

    return {
        boards: items,
        isFetching,
        lastUpdated
    };
};

function getBoardStats(board, state) {
    const { lists } = state.entities;
    const listsIds = board.lists || [];

    const listsLength = listsIds.length;
    const cardsLength = listsIds.reduce((acc, listId) => {
        const list = lists[listId];
        const cardsIds = list.cards || [];
        return acc + cardsIds.length;
    }, 0);

    return { listsLength, cardsLength };
};

export default connect(
    mapStateToProps
)(IndexPage);
