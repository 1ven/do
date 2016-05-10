import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard, removeBoard } from '../actions/boardsActions';
import { showModal } from '../actions/modalActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';

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
            onBoardCreatorSubmit,
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
                onBoardCreatorSubmit={onBoardCreatorSubmit}
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
    return {
        onAddBoardBtnClick: () => dispatch(showModal(
            'Add board',
            <div>test</div>
        )),
        onBoardCreatorSubmit: title => dispatch(createBoard(title)),
        onBoardTileRemoveClick: id => dispatch(removeBoard(id)),
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage);
