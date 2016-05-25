import React, { PropTypes, Component } from 'react';
import Input from './Input';
import Btn from './Btn';
import Form from './Form';

function SendCommentForm({ onSubmit }) {
    return (
        <Form
            className="b-send-comment-form"
            onSubmit={onSubmit}
        >
            <Input
                name="text"
                placeholder="Enter your text"
            />
            <div className="b-send-comment-form__submit">
                <Btn
                    modifiers={['sm', 'full-width']}
                    text="Send"
                    type="Submit"
                    tagName="button"
                />
            </div>
        </Form>
    );
};

SendCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default SendCommentForm;
