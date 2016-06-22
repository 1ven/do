import React, { PropTypes, Component } from 'react';
import Form from './Form';
import Btn from './Btn';

class FormBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  getError(name) {
    const error = this.state.errors.filter(e => e.name === name)[0];
    return error ? error.message : null;
  }

  render() {
    const { rows, onCancelClick, request } = this.props;

    return (
      <Form
        className="b-form-box"
        onSubmit={request}
      >
        <div className="b-form-box__rows">
          {rows.map((row, i) => (
            <div
              className="b-form-box__row"
              key={i}
            >
              {React.cloneElement(row, {
                error: this.getError(row.props.name),
              })}
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
            />
          </div>
        </div>
      </Form>
    );
  }
}

FormBox.propTypes = {
  rows: PropTypes.array.isRequired,
  request: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default FormBox;
