import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBoard } from '../actions/boardsActions';
import { createList } from '../actions/listsActions';
import Board from '../components/Board';
import Loader from '../components/Loader';
import CreateListModal from './CreateListModal';
import EditBoardModal from './EditBoardModal';

class BoardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: null
        };

        this.handleAddListBtnClick = this.handleAddListBtnClick.bind(this);
        this.handleEditBoardClick = this.handleEditBoardClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
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
        this.setState({
            modal: {
                name: 'createList'
            }
        });
    }

    handleEditBoardClick() {
        const { board } = this.props;

        this.setState({
            modal: {
                name: 'editBoard',
                data: board
            }
        });
    }

    hideModal() {
        this.setState({ modal: null });
    }

    render() {
        const {
            board,
            isFetching,
            lastUpdated
        } = this.props;
        const { modal } = this.state;

        return (
            <div>
                {isFetching || (!lastUpdated && !board) ? (
                    <Loader />
                ) : !board ? (
                    <div>Board not found</div>
                ) : (
                    <Board
                        data={board}
                        onAddListBtnClick={this.handleAddListBtnClick}
                        onEditBoardClick={this.handleEditBoardClick}
                    />
                )}
                {modal && modal.name === 'editBoard' ? (
                    <EditBoardModal
                        board={modal.data}
                        hideModal={this.hideModal}
                    />
                ) : modal && modal.name === 'createList' ? (
                    <CreateListModal
                        boardId={board.id}
                        hideModal={this.hideModal}
                    />
                ) : null}
            </div>
        );;
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
