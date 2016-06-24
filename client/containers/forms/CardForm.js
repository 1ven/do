import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { handleReduxFormError } from '../../utils';
import FormBox from '../../components/FormBox';
import InputBox from '../../components/InputBox';

function CardForm({
  fields: {
    text,
  },
  submitting,
  handleSubmit,
  onFormBoxCancelClick,
}) {
  return (
    <FormBox
      rows={[
        <InputBox
          title="Text"
          inputProps={{
            ...text,
            placeholder: 'Enter card text',
          }}
          error={handleReduxFormError(text)}
        />
      ]}
      onSubmit={handleSubmit}
      onCancelClick={onFormBoxCancelClick}
      submitting={submitting}
    />
  );
}

CardForm.propTypes = {
  onFormBoxCancelClick: PropTypes.func.isRequired,
};

function validate(values) {
  const errors = {};
  if (!values.text || !values.text.length) {
    errors.text = 'Text is required';
  }
  return errors;
}

export default reduxForm({
  form: 'card',
  fields: ['text'],
  validate,
})(CardForm);
