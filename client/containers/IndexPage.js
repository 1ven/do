import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard } from '../actions/boardsActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.handleBoardCreatorSubmit = this.handleBoardCreatorSubmit.bind(this);
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

    render() {
        const { boards, isFetching, lastUpdated } = this.props;
        const isEmpty = boards.length === 0;

        return isEmpty ? (
            isFetching || !lastUpdated ? (
                <Loader />
            ) : (
                <div>No result.</div>
            )
        ) : (
            isFetching ? (
                <Loader />
            ) : (
                <BoardsList
                    boards={boards}
                    onBoardCreatorSubmit={this.handleBoardCreatorSubmit}
                />
            )
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
