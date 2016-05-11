import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createBoard } from '../actions/boardsActions';
import { hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class CreateBoardModal extends Component {
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

CreateBoardModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(createBoard(formData.title))
                .then(action => {
                    if (!action.payload.error) {
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
)(CreateBoardModal);
