import React, { PropTypes, Component } from 'react';

class BoardCreator extends Component {
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
    }

    handleInputChange(e) {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        return (
            <form
                className="c-board-creator"
                onSubmit={this.handleFormSubmit}
            >
                <input
                    className="c-board-creator__input"
                    onChange={this.handleInputChange}
                    value={this.state.inputValue}
                />
            </form>
        );
    }
}

BoardCreator.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default BoardCreator;
