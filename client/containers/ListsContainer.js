import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { removeList } from '../actions/listsActions';
import { removeListId } from '../actions/boardsActions';
import EditListModal from './EditListModal';

class ListsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: null
        };

        this.handleEditListClick = this.handleEditListClick.bind(this);
        this.handleListRemoveClick = this.handleListRemoveClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        this.setState({ modal: null });
    }

    handleEditListClick(list) {
        this.setState({
            modal: {
                name: 'editList',
                data: list
            }
        });
    }

    handleListRemoveClick(id) {
        const { dispatch, boardId } = this.props;
        dispatch(removeList(id))
            .then(action => {
                if (!action.payload.error) {
                    dispatch(removeListId(ownProps.boardId, id));
                }
            });
    }

    render() {
        const { modal } = this.state;
        const { lists, boardId } = this.props;
        return (
            <div>
                <Lists
                    onListRemoveClick={this.handleListRemoveClick}
                    onListEditClick={this.handleEditListClick}
                    lists={lists}
                    boardId={boardId}
                />
                {modal && modal.name === 'editList' ? (
                    <EditListModal
                        list={modal.data}
                        hideModal={this.hideModal}
                    />
                ) : null}
            </div>
        );
    }
};

ListsContainer.propTypes = {
    boardId: PropTypes.string.isRequired,
    lists: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { lists } = state.entities;
    const listsIds = ownProps.lists || [];

    return {
        lists: listsIds.map(id => lists[id])
    };
};

export default connect(
    mapStateToProps
)(ListsContainer);
