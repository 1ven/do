import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard, removeBoard } from '../actions/boardsActions';
import { showModal, hideModal } from '../actions/modalActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import BoardCreator from '../components/BoardCreator';

class IndexPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.boards.length) { this.props.dispatch(getBoards()); }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    render() {
        const {
            boards,
            isFetching,
            lastUpdated,
            onBoardTileRemoveClick,
            onAddBoardBtnClick
        } = this.props;

        const isEmpty = boards.length === 0;

        return isFetching || (!lastUpdated && isEmpty) ? (
            <Loader />
        ) : isEmpty ? (
            <div>No result.</div>
        ) : (
            <BoardsList
                boards={boards}
                onBoardTileRemoveClick={onBoardTileRemoveClick}
                onAddBoardBtnClick={onAddBoardBtnClick}
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

function mapDispatchToProps(dispatch) {
    const createBoardCb = formData => {
        dispatch(createBoard(formData.title))
            .then(action => {
                if (!action.payload.error) {
                    dispatch(hideModal());
                }
            });
    };

    return {
        onAddBoardBtnClick: () => dispatch(showModal(
            'Create board',
            <BoardCreator
                onModalFormCancelClick={() => dispatch(hideModal())}
                onModalFormSubmit={createBoardCb}
            />
        )),
        onBoardTileRemoveClick: id => dispatch(removeBoard(id)),
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);
