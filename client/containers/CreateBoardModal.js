import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { createBoard } from '../actions/boardsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

class CreateBoardModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(formData) {
        const { hideModal, dispatch } = this.props;

        dispatch(createBoard(formData.title))
            .then(action => {
                if (!action.payload.error) {
                    return hideModal();
                }
                this.setState({
                    errors: action.payload.result
                });
            });
    }

    getError(name) {
        const error = this.state.errors.filter(e => e.name == name)[0];
        return error ? error.message : null;
    }

    render() {
        const { hideModal } = this.props;
        const { errors } = this.state;

        return (
            <Modal
                title="Create board"
                hideModal={hideModal}
            >
                <FormBox
                    rows={[
                        <InputBox
                            title="Title"
                            inputProps={{
                                name: "title",
                                placeholder: "Enter board title",
                                focus: {true}
                            }}
                            error={this.getError('title')}
                        />
                    ]}
                    onSubmit={this.handleSubmit}
                    onCancelClick={hideModal}
                />
            </Modal>
        );
    }
};

CreateBoardModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
};

export default connect()(CreateBoardModal);
