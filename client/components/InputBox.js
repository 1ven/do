import React, { PropTypes } from 'react';
import Input from './Input';

function InputBox({
  title,
  name,
  value,
  error,
  placeholder,
}) {
  return (
    <div className="b-input-box">
      <label
        className="b-input-box__title"
        htmlFor={name}
      >
        {title}
      </label>
      {error ? (
        <span className="b-input-box__error">{error}</span>
      ) : false}
      <Input
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

InputBox.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputBox;
