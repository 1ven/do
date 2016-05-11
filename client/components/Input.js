import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: props.value || ''
        };
    }

    componentDidMount() {
        const { focus } = this.props;

        focus && ReactDOM.findDOMNode(this.refs.input).focus();
    }

    handleChange(e) {
        const value = e.target.value;
        const { onChange } = this.props;

        this.setState({ value });

        onChange && onChange(e);
    }

    render() {
        const { value } = this.state;

        return (
            <div className="b-input">
                <input
                    {...this.props}
                    className="b-input__node"
                    type="text"
                    ref="input"
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Input;
