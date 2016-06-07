import React, { PropTypes, Component } from 'react';
import serialize from 'form-serialize';

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = serialize(this.form, {
      hash: true,
    });

    this.props.onSubmit(formData);
  }

  render() {
    const { children, className } = this.props;
    return (
      <form
        className={className}
        onSubmit={this.handleSubmit}
        ref={form => { this.form = form; }}
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Form;
