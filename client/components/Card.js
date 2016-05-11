import React, { Component, PropTypes } from 'react';
import InputForm from './InputForm';

class Card extends Component {
    constructor(props) {
        super(props);
        this.handleTextClick = this.handleTextClick.bind(this);
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
    onTextClick: PropTypes.func.isRequired
};

export default Card;
