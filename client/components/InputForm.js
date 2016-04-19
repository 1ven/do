import React, { PropTypes, Component } from 'react';

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            inputValue: ''
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const { inputValue } = this.state;
        const { onSubmit } = this.props;

        if (!inputValue.trim()) { return; }

        onSubmit(inputValue);
        this.clearInput();
    }

    clearInput() {
        this.setState({
            inputValue: ''
        });
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        return (
            <form
                className="c-input-form"
                onSubmit={this.handleFormSubmit}
            >
                <input
                    className="c-input-form__input"
                    onChange={this.handleInputChange}
                    value={this.state.inputValue}
                    placeholder={this.props.placeholder}
                />
            </form>
        );
    }
}

InputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default InputForm;
