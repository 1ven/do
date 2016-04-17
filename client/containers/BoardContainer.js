import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBoard } from '../actions/boardsActions';
import Board from '../components/Board';

class BoardContainer extends Component {
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
        const { board } = this.props;
        return board ? (
            <Board {...board} />
        ) : null;
    }
};

function loadBoard(props) {
    const { dispatch, params: { id } } = props;
    dispatch(getBoard(id));
};

function mapStateToProps(state, ownProps) {
    const id = ownProps.params.id;
    const { boards } = state.entities;

    return {
        board: boards[id]
    };
};

export default connect(
    mapStateToProps
)(BoardContainer);
