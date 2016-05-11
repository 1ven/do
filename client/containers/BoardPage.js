import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBoard } from '../actions/boardsActions';
import { createList } from '../actions/listsActions';
import { showModal } from '../actions/modalActions';
import Board from '../components/Board';
import Loader from '../components/Loader';
import CreateListModal from './CreateListModal';
import EditBoardModal from './EditBoardModal';

class BoardPage extends Component {
    constructor(props) {
        super(props);

        this.handleAddListBtnClick = this.handleAddListBtnClick.bind(this);
        this.handleEditBoardClick = this.handleEditBoardClick.bind(this);
    }

    componentWillMount() {
        // caching
        if (!this.props.board) { loadBoard(this.props); }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            loadBoard(nextProps);
        }
    }

    handleAddListBtnClick() {
        const { dispatch, board } = this.props;

        dispatch(showModal(
            'Create list',
            <CreateListModal boardId={board.id} />
        ));
    }

    handleEditBoardClick() {
        const { board, dispatch } = this.props;

        dispatch(showModal(
            'Edit board',
            <EditBoardModal board={board} />
        ));
    }

    render() {
        const {
            board,
            isFetching,
            lastUpdated
        } = this.props;

        return isFetching || (!lastUpdated && !board) ? (
            <Loader />
        ) : !board ? (
            <div>Board not found</div>
        ) : (
            <Board
                data={board}
                onAddListBtnClick={this.handleAddListBtnClick}
                onEditBoardClick={this.handleEditBoardClick}
            />
        );
    }
};

BoardPage.propTypes = {
    board: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function loadBoard(props) {
    const { dispatch, params: { id } } = props;
    dispatch(getBoard(id));
};

function mapStateToProps(state, ownProps) {
    const { isFetching, lastUpdated } = state.pages.board;
    const board = state.entities.boards[ownProps.params.id];

    return {
        board,
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(BoardPage);
