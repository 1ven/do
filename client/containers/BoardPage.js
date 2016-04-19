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

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            loadBoard(nextProps);
        }
    }

    render() {
        const { board, loading } = this.props;
        console.log(loading);

        return !loading ? (
            <Board {...board} />
        ) : <Loader />;
    }
};

function loadBoard(props) {
    const { dispatch, params: { id } } = props;
    dispatch(getBoard(id));
};

function mapStateToProps(state) {
    const id = state.pages.board.id;
    const board = state.entities.boards[id];
    const loading = !board ? true : state.pages.board.loading;

    return {
        board,
        loading
    };
};

export default connect(
    mapStateToProps
)(BoardPage);
