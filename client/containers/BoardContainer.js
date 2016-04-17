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
        this.loadBoard();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.loadBoard();
        }
    }

    loadBoard() {
        const { dispatch, params: { id } } = this.props;
        dispatch(getBoard(id));
    }

    render() {
        const { board } = this.props;
        return board ? (
            <Board {...board} />
        ) : null;
    }
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
