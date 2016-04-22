import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard, removeBoard } from '../actions/boardsActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.handleBoardCreatorSubmit = this.handleBoardCreatorSubmit.bind(this);
        this.handleBoardTileRemoveClick = this.handleBoardTileRemoveClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.boards.length) { this.props.dispatch(getBoards()); }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    handleBoardCreatorSubmit(title) {
        this.props.dispatch(createBoard(title));
    }

    handleBoardTileRemoveClick(id) {
        this.props.dispatch(removeBoard(id));
    }

    render() {
        const { boards, isFetching, lastUpdated } = this.props;
        const isEmpty = boards.length === 0;

        return isFetching || (!lastUpdated && isEmpty) ? (
            <Loader />
        ) : isEmpty ? (
            <div>No result.</div>
        ) : (
            <BoardsList
                boards={boards}
                onBoardCreatorSubmit={this.handleBoardCreatorSubmit}
                onBoardTileRemoveClick={this.handleBoardTileRemoveClick}
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

const mapStateToProps = (state) => {
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
