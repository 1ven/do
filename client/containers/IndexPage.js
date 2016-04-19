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

    handleBoardCreatorSubmit(title) {
        this.props.dispatch(createBoard(title));
    }

    render() {
        const { boards, loading } = this.props;
        console.log(loading);

        return !loading ? (
            <BoardsList
                boards={boards}
                onBoardCreatorSubmit={this.handleBoardCreatorSubmit}
            />
        ) : <Loader />;
    }
}

IndexPage.propTypes = {
    boards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const { boards, lists, cards } = state.entities;
    const { ids } = state.pages.index;
    const loading = !ids.length ? true : state.pages.index.loading;

    return {
        boards: ids.map(id => boards[id]),
        loading
    };
};

export default connect(
    mapStateToProps
)(IndexPage);
