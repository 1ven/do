import React, { PropTypes, Component } from 'react';
import Btn from './Btn';

class FormBox extends Component {
  render() {
    const { rows, submitting, onCancelClick, onSubmit } = this.props;

    return (
      <form
        onSubmit={onSubmit}
        className="b-form-box"
      >
        <div className="b-form-box__rows">
          {rows.map((row, i) => (
            <div
              className="b-form-box__row"
              key={i}
            >
              {row}
            </div>
          ))}
        </div>
        <div className="b-form-box__buttons">
          <div className="b-form-box__button">
            <Btn
              text="Cancel"
              onClick={onCancelClick}
              modifiers={['red', 'md']}
            />
          </div>
          <div className="b-form-box__button">
            <Btn
              text="Submit"
              tagName="button"
              nodeAttrs={{
                type: 'submit',
              }}
              modifiers={['md']}
              spinner={submitting}
            />
          </div>
        </div>
      </form>
    );
  }
}

FormBox.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  submitting: PropTypes.bool,
};

export default FormBox;
