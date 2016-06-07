import React, { PropTypes } from 'react';
import Btn from './Btn';
import Input from './Input';
import Form from './Form';

function EditCardForm({ data, onCancel, onSubmit }) {
  return (
    <Form
      className="b-edit-card-form"
      onSubmit={onSubmit}
    >
      <div className="b-edit-card-form__area">
        <Input
          value={data.text}
          name="text"
          focus
        />
      </div>
      <div className="b-edit-card-form__buttons">
        <div className="b-edit-card-form__button">
          <Btn
            modifiers={['sm']}
            text="Save"
            type="Submit"
            tagName="button"
          />
        </div>
        {onCancel ? (
          <div className="b-edit-card-form__button">
            <Btn
              modifiers={['sm', 'red']}
              text="Cancel"
              onClick={onCancel}
            />
          </div>
        ) : false}
      </div>
    </Form>
  );
}

EditCardForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default EditCardForm;
