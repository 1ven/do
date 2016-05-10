import React, { PropTypes, Component } from 'react';

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            value: this.props.value || ''
        };
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
                />
            </form>
        );
    }
}

InputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default InputForm;
