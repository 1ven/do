import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard, removeBoard } from '../actions/boardsActions';
import { showModal, hideModal } from '../actions/modalActions';
import BoardsList from '../components/BoardsList.js';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class IndexPage extends Component {
    constructor(props) {
        super(props);

        this.handleModalFormSubmit = this.handleModalFormSubmit.bind(this);
        this.handleAddBoardBtnClick = this.handleAddBoardBtnClick.bind(this);
    }

    componentWillMount() {
        if (!this.props.boards.length) { this.props.dispatch(getBoards()); }
    }

    shouldComponentUpdate(nextProps) {
        return !(!this.props.isFetching && !this.props.lastUpdated && nextProps.isFetching);
    }

    handleAddBoardBtnClick() {
        const { dispatch } = this.props;

        dispatch(showModal(
            'Create board',
            <ModalForm
                rows={[
                    <Input name="title" placeholder="Title" />
                ]}
                onSubmit={this.handleModalFormSubmit}
                onCancelClick={() => dispatch(hideModal())}
            />
        ));
    }

    handleModalFormSubmit(formData) {
        const { dispatch } = this.props;

        dispatch(createBoard(formData.title))
            .then(action => {
                if (!action.payload.error) {
                    dispatch(hideModal());
                }
            });
    }

    render() {
        const {
            boards,
            isFetching,
            lastUpdated,
            dispatch
        } = this.props;

        const isEmpty = boards.length === 0;

        return isFetching || (!lastUpdated && isEmpty) ? (
            <Loader />
        ) : isEmpty ? (
            <div>No result.</div>
        ) : (
            <BoardsList
                boards={boards}
                onBoardTileRemoveClick={id => dispatch(removeBoard(id))}
                onAddBoardBtnClick={this.handleAddBoardBtnClick}
            />
        );
    }
}

IndexPage.propTypes = {
    boards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
};

function mapStateToProps(state) {
    const { boards, lists, cards } = state.entities;
    const { ids, isFetching, lastUpdated } = state.pages.index;

    return {
        boards: ids.map(id => boards[id]),
        isFetching,
        lastUpdated
    };
};

export default connect(
    mapStateToProps
)(IndexPage);
