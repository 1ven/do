import React, { Component, PropTypes } from 'react';
import InputForm from './InputForm';

class Card extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this);
        this.handleTextClick = this.handleTextClick.bind(this);
    }

    handleRemoveClick() {
        const { onRemoveClick, id } = this.props;
        onRemoveClick(id);
    }

    handleInputFormSubmit(text) {
        const { onInputFormSubmit, id } = this.props;
        onInputFormSubmit(id, text);
    }

    handleTextClick() {
        const { onTextClick, id } = this.props;
        onTextClick(id);
    }

    render() {
        const { onTextClick, text, isEditing } = this.props;
        return (
            <div className="b-card">
                {isEditing ? (
                    <InputForm
                        value={text}
                        onSubmit={this.handleInputFormSubmit}
                    />
                ) : (
                    <div
                        className="b-card__text"
                        onClick={this.handleTextClick}
                    >{text}</div>
                )}
            </div>
        );
    }
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    onRemoveClick: PropTypes.func.isRequired,
    onInputFormSubmit: PropTypes.func.isRequired,
    onTextClick: PropTypes.func.isRequired
};

export default Card;
