import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modalActions';
import Modal from '../components/Modal';

class ModalContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { modal, onCloseClick } = this.props;

        if (modal) {
            return (
                <Modal
                    title={modal.title}
                    content={modal.content}
                    onCloseClick={onCloseClick}
                />
            );
        }

        return null;
    }
};

function mapStateToProps(state) {
    return {
        modal: state.modal
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onCloseClick: () => dispatch(hideModal())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContainer);
