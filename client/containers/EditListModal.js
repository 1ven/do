import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateList } from '../actions/listsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import Input from '../components/Input';

class EditListModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list, onSubmit, hideModal } = this.props;

        return (
            <Modal
                title="Edit list"
                hideModal={hideModal}
            >
                <FormBox
                    rows={[
                        <Input
                            name="title"
                            placeholder="Title"
                            value={list.title}
                            focus={true}
                        />
                    ]}
                    onSubmit={onSubmit}
                    onCancelClick={hideModal}
                />
            </Modal>
        );
    }
};

EditListModal.propTypes = {
    list: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(updateList(ownProps.list.id, formData))
                .then(action => {
                    if (!action.payload.error) {
                        ownProps.hideModal();
                    }
                });
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditListModal);
