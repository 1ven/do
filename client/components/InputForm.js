import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import Icon from './Icon';

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            value: this.props.value || ''
        };
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            ReactDOM.findDOMNode(this.refs.input).focus();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const { value } = this.state;
        const { onSubmit } = this.props;

        if (!value.trim()) { return; }

        onSubmit(value);
        this.clearInput();
    }

    clearInput() {
        this.setState({
            value: ''
        });
    }

    handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const { onCrossClick } = this.props;
        const cross = onCrossClick ? (
            <a
                className="b-input-form__cross"
                onClick={onCrossClick}
            >
                <Icon name="cross" />
            </a>
        ) : null;

        return (
            <form
                className="b-input-form"
                onSubmit={this.handleFormSubmit}
            >
                <input
                    className="b-input-form__input"
                    onChange={this.handleInputChange}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    ref="input"
                />
                {cross}
            </form>
        );
    }
}

InputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCrossClick: PropTypes.func,
    autoFocus: PropTypes.bool
};

export default InputForm;
