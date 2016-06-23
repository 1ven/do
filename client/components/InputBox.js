import React, { PropTypes } from 'react';
import Input from './Input';

function InputBox({
  title,
  error,
  inputProps,
}) {
  return (
    <div className="b-input-box">
      <label
        className="b-input-box__title"
        htmlFor={inputProps.name}
      >
        {title}
      </label>
      {error ? (
        <span className="b-input-box__error">{error}</span>
      ) : false}
      <Input {...inputProps}/>
    </div>
  );
}

InputBox.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  inputProps: PropTypes.object.isRequired,
};

export default InputBox;
