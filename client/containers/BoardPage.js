import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getBoard, addListId } from '../actions/boardsActions';
import { createList } from '../actions/listsActions';
import { showModal, hideModal } from '../actions/modalActions';
import Board from '../components/Board';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class BoardPage extends Component {
    constructor(props) {
        super(props);

        this.handleAddListBtnClick = this.handleAddListBtnClick.bind(this);
        this.handleCreateListFormSubmit = this.handleCreateListFormSubmit.bind(this);
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

    handleAddListBtnClick() {
        const { dispatch } = this.props;

        dispatch(showModal(
            'Create list',
            <ModalForm
                rows={[
                    <Input
                        name="title"
                        placeholder="Title"
                        focus={true}
                    />
                ]}
                onSubmit={this.handleCreateListFormSubmit}
                onCancelClick={() => dispatch(hideModal())}
            />
        ));
    }

    handleCreateListFormSubmit(formData) {
        const boardId = this.props.board.id;
        const { dispatch } = this.props;

        dispatch(createList(boardId, formData.title))
            .then(action => {
                if (!action.payload.error) {
                    dispatch(addListId(boardId, action.payload.result))
                    dispatch(hideModal());
                }
            });
    }

    render() {
        const {
            board,
            isFetching,
            lastUpdated
        } = this.props;

        return isFetching || (!lastUpdated && !board) ? (
            <Loader />
        ) : !board ? (
            <div>Board not found</div>
        ) : (
            <Board
                data={board}
                onAddListBtnClick={this.handleAddListBtnClick}
            />
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
    const { isFetching, lastUpdated } = state.pages.board;
    const board = state.entities.boards[ownProps.params.id];

    return {
        board,
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(BoardPage);
