import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { getFullBoard } from '../actions/fullBoardActions';
import FullBoard from '../components/FullBoard';

class FullBoardContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.loadData();
        }
    }

    loadData() {
        const { dispatch, id } = this.props;
        dispatch(getFullBoard(id));
    }

    render() {
        const { id, title, fullLists } = this.props;
        return (
            <FullBoard
                id={id}
                title={title}
                lists={fullLists}
            />
        );
    }
};

function mapStateToProps(state, ownProps) {
    const { boards, lists } = state.entities;
    const id = parseInt(ownProps.params.id);
    const board = boards[id];

    let fullLists = [];
    let boardTitle = '';

    if (boards && !isEmpty(boards[id])) {
        boardTitle = boards[id].title;
    }

    if (!isEmpty(lists) && !isEmpty(boards) && board && board.lists) {
        fullLists = map(board.lists, id => lists[id]);
    }

    return {
        title: boardTitle,
        fullLists,
        id
    };
};

export default connect(mapStateToProps)(FullBoardContainer);
