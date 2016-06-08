import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

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

    if (focus) ReactDOM.findDOMNode(this.refs.input).focus();
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
      <input
        {...this.props}
        className="b-input"
        type="text"
        ref="input"
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
