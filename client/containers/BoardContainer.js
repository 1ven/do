import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { get } from '../actions/boardsActions';
import Board from '../components/Board';

class BoardContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.loadBoard();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.loadBoard();
        }
    }

    loadBoard() {
        const { dispatch, params: { id } } = this.props;
        dispatch(getFullBoard(id));
    }

    render() {
        const { board } = this.props;
        return board ? (
            <Board {...board} />
        ) : null;
    }
};

function mapStateToProps(state, ownProps) {
    const boardId = ownProps.params.id;
    const { boards } = state.entities;
    console.log(boards)

    return {
        board: boards[boardId] || null
    };
};

export default connect(
    mapStateToProps
)(BoardContainer);
