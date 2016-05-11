import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, removeBoard } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import CreateBoardModal from './CreateBoardModal';
import EditBoardModal from './EditBoardModal';

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

        return isFetching || (!lastUpdated && isEmpty) ? (
            <Loader />
        ) : isEmpty ? (
            <div>No result.</div>
        ) : (
            <BoardsList
                boards={boards}
                onBoardTileRemoveClick={this.handleBoardTileRemoveClick}
                onBoardTileEditClick={this.handleBoardTileEditClick}
                onAddBoardBtnClick={this.handleAddBoardBtnClick}
            />
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
    const { boards, lists, cards } = state.entities;
    const { ids, isFetching, lastUpdated } = state.pages.index;

    return {
        boards: ids.map(id => boards[id]),
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(IndexPage);
