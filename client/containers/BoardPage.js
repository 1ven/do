import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBoard } from '../actions/boardsActions';
import Board from '../components/Board';
import Loader from '../components/Loader';

class BoardPage extends Component {
    constructor(props) {
        super(props);
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

    render() {
        const { board, isFetching, lastUpdated } = this.props;

        return isFetching || (!lastUpdated && !board) ? (
            <Loader />
        ) : !board ? (
            <div>Board not found</div>
        ) : (
            <Board {...board} />
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
    const id = ownProps.params.id;
    const board = state.entities.boards[id];
    const { isFetching, lastUpdated } = state.pages.board;

    return {
        board,
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(BoardPage);
