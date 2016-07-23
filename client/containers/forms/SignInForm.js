import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Btn from '../../components/Btn';
import SignRow from '../../components/SignRow';
import Checkbox from '../../components/Checkbox';

function SignIn({ fields, submitting, handleSubmit }) {
  const rows = [
    <input className="b-input-a" type="text" placeholder="Username" name="username" />,
    <input className="b-input-a" type="password" placeholder="Password" name="password" />,
  ];
  return (
    <form
      className="b-sign-form"
      onSubmit={handleSubmit}
    >
      {rows.map((row, i) => {
        const field = fields[row.props.name];
        return (
          <SignRow
            key={i}
            error={field.error && field.touched ? field.error : null}
          >
            {React.cloneElement(row, {
              value: field.value,
              onChange: field.onChange,
            })}
          </SignRow>
        );
      })}
      <SignRow>
        <div className="b-items">
          <div className="b-items__item">
            <Checkbox
              attrs={{
                name: 'remember',
              }}
              text="Remember me"
            />
          </div>
        </div>
      </SignRow>
      <SignRow>
        <Btn
          type="submit"
          tagName="button"
          modifiers={['full-width', 'blue']}
          text="Sign in"
          spinner={submitting}
        />
      </SignRow>
    </form>
  );
}

export default reduxForm({
  form: 'sign-in',
  fields: ['username', 'password', 'remember'],
})(SignIn);
