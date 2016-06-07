import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';

class SignForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formNode = ReactDOM.findDOMNode(this.refs.form);
    const formData = serialize(formNode, {
      hash: true,
    });

    this.props.onSubmit(formData);
  }

  displayError(row) {
    const error = this.props.errors.filter(e => e.name === row.props.name)[0];

    return error ? (
      <span className="b-sign-form__error">
        {error.message}
      </span>
    ) : false;
  }

  render() {
    const { rows } = this.props;

    return (
      <form
        className="b-sign-form"
        ref="form"
        onSubmit={this.handleSubmit}
      >
        {rows.map((row, i) => (
          <div
            className="b-sign-form__row"
            key={i}
          >
            {row}
            {this.displayError(row)}
          </div>
        ))}
      </form>
    );
  }
}

SignForm.defaultProps = {
  errors: [],
};

SignForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  rows: PropTypes.node.isRequired,
  errors: PropTypes.array,
};

export default SignForm;
