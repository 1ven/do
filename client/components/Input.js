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

    return (
      <Textarea
        {...this.props}
        className="b-input"
        type="text"
        ref={node => this.node = node}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  focus: PropTypes.bool,
};

export default Input;
