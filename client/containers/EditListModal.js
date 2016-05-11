import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateList } from '../actions/listsActions';
import { hideModal } from '../actions/modalActions';
import ModalForm from '../components/ModalForm';
import Input from '../components/Input';

class EditListModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list, onSubmit, onCancelClick } = this.props;

        return (
            <ModalForm
                rows={[
                    <Input
                        name="title"
                        placeholder="Title"
                        value={list.title}
                        focus={true}
                    />
                ]}
                onSubmit={onSubmit}
                onCancelClick={onCancelClick}
            />
        );
    }
};

EditListModal.propTypes = {
    list: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(updateList(ownProps.list.id, formData))
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
)(EditListModal);
