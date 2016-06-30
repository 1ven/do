import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { handleReduxFormError } from '../../utils';
import FormBox from '../../components/FormBox';
import InputBox from '../../components/InputBox';

function BoardForm({
  fields: {
    title,
  },
  submitting,
  handleSubmit,
  onFormBoxCancelClick,
}) {
  return (
    <FormBox
      rows={[
        <InputBox
          title="Title"
          inputProps={{
            ...title,
            placeholder: 'Enter board title',
            focus: true,
          }}
          error={handleReduxFormError(title)}
        />
      ]}
      onSubmit={handleSubmit}
      onCancelClick={onFormBoxCancelClick}
      submitting={submitting}
    />
  );
}

BoardForm.propTypes = {
  onFormBoxCancelClick: PropTypes.func.isRequired,
};

function validate(values) {
  const errors = {};
  if (!values.title || !values.title.length) {
    errors.title = 'Title is required';
  }
  return errors;
}

export default function(mapStateToProps) {
  return reduxForm({
    form: 'board',
    fields: ['title'],
    validate,
  }, mapStateToProps)(BoardForm);
}
