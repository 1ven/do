import React, { PropTypes, Component } from 'react';
import Textarea from 'react-textarea-autosize';

class Input extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: props.value || '',
    };
  }

  componentDidMount() {
    const { focus } = this.props;
    const length = this.state.value.length;

    if (focus) {
      this.node.focus();
    }

    if (focus && this.node.setSelectionRange) {
      this.node.setSelectionRange(length, length);
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const { onChange } = this.props;

    this.setState({ value });

    if (onChange) onChange(e);
  }

  render() {
    const { value } = this.state;
    const elementProps = {
      placeholder: this.props.placeholder,
      className: 'b-input',
      type: 'text',
      ref: node => this.node = node,
      onChange: this.handleChange,
      value,
    };

    return this.props.autosize ?
      <Textarea {...elementProps} /> :
      <input {...elementProps} />;
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  focus: PropTypes.bool,
  autosize: PropTypes.bool,
};

export default Input;
