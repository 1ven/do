import React, { PropTypes } from 'react';
import ModalForm from './ModalForm';
import Input from './Input';

function BoardCreator({
    onModalFormSubmit,
    onModalFormCancelClick
}) {
    return (
        <ModalForm
            rows={[
                <Input
                    name="title"
                    placeholder="Title"
                />
            ]}
            onSubmit={onModalFormSubmit}
            onCancelClick={onModalFormCancelClick}
        />
    );
};

BoardCreator.propTypes = {
    onModalFormSubmit: PropTypes.func.isRequired,
    onModalFormCancelClick: PropTypes.func.isRequired
};

export default BoardCreator;
