import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createList } from '../actions/listsActions';
import { addListId } from '../actions/boardsActions';
import { hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class CreateListModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onSubmit, onCancelClick } = this.props;

        return (
            <ModalForm
                rows={[
                    <Input
                        name="title"
                        placeholder="Title"
                        focus={true}
                    />
                ]}
                onSubmit={onSubmit}
                onCancelClick={onCancelClick}
            />
        );
    }
};

CreateListModal.propTypes = {
    boardId: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
    const { boardId } = ownProps;

    return {
        onSubmit: function (formData) {
            dispatch(createList(boardId, formData.title))
                .then(action => {
                    if (!action.payload.error) {
                        dispatch(addListId(boardId, action.payload.result))
                        dispatch(hideModal());
                    }
                });
        },
        onCancelClick: function () {
            dispatch(hideModal());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateListModal);
