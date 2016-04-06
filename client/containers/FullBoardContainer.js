import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { getFullBoard } from '../actions/fullBoardActions';

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

    componentDidUpdate() {
        console.log(this.props.lists);
    }

    render() {
        return <div/>;
    }
};

function mapStateToProps(state, ownProps) {
    const { boards, lists } = state.entities;
    const { id } = ownProps.params;
    const board = boards[id];

    let listsArray = [];

    if (!isEmpty(lists) && !isEmpty(boards) && board && board.lists) {
        listsArray = map(board.lists, id => lists[id]);
    }

    return {
        lists: listsArray,
        id
    };
};

export default connect(mapStateToProps)(FullBoardContainer);
