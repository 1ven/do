import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { getBoards, removeBoard } from '../actions/boardsActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import BottomBox from '../components/BottomBox';
import Btn from '../components/Btn';
import CreateBoardModal from './CreateBoardModal';
import EditBoardModal from './EditBoardModal';

import { createNotificationWithTimeout } from '../actions/notificationsActions';

class IndexPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: null
        };

        this.handleAddBoardBtnClick = this.handleAddBoardBtnClick.bind(this);
        this.handleBoardTileEditClick = this.handleBoardTileEditClick.bind(this);
        this.handleBoardTileRemoveClick = this.handleBoardTileRemoveClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillMount() {
        if (!this.props.lastUpdated) {
            this.props.dispatch(getBoards());
        }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    handleAddBoardBtnClick() {
        this.setState({
            modal: {
                name: 'createBoard'
            }
        });
    }

    handleBoardTileEditClick(board) {
        this.setState({
            modal: {
                name: 'editBoard',
                data: board
            }
        });
    }

    hideModal() {
        this.setState({
            modal: null
        });
    }

    handleBoardTileRemoveClick(id) {
        this.props.dispatch(removeBoard(id));
    }

    render() {
        const {
            groups,
            isFetching,
            lastUpdated,
            dispatch
        } = this.props;
        const { modal } = this.state;

        const isEmpty = groups.length === 0;

        const addBoardBtn = (
            <Btn
                text="Add new board"
                onClick={this.handleAddBoardBtnClick}
            />
        );

        return (
            <div>
                {isFetching || (!lastUpdated && isEmpty) ? (
                    <Loader />
                ) : isEmpty ? (
                    <div>No result.</div>
                ) : (
                    <BoardsList
                        groups={groups}
                        onBoardTileRemoveClick={this.handleBoardTileRemoveClick}
                        onBoardTileEditClick={this.handleBoardTileEditClick}
                    />
                )}
                <BottomBox
                    button={addBoardBtn}
                />
                <div>
                    {modal && modal.name === 'createBoard' ? (
                        <CreateBoardModal
                            hideModal={this.hideModal}
                        />
                    ) : modal && modal.name === 'editBoard' ? (
                        <EditBoardModal
                            hideModal={this.hideModal}
                            board={modal.data}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

IndexPage.propTypes = {
    groups: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
};

function mapStateToProps(state) {
    const { boards, lists } = state.entities;
    const { ids, isFetching, lastUpdated } = state.pages.index;
    const items = ids.map(id => boards[id]);

    return {
        groups: [{
            title: 'Starred boards',
            boards: items.filter(b => b.starred)
        }, {
            title: 'My boards',
            boards: items
        }],
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(IndexPage);
