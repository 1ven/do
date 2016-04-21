import React, { Component, PropTypes } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }

    handleRemoveClick() {
        const { onRemoveClick, id } = this.props;
        onRemoveClick(id);
    }

    render() {
        const { text } = this.props;
        return (
            <div className="c-card">
                <div className="c-card__text">{text}</div>
                <a className="c-card__remove" onClick={this.handleRemoveClick}>X</a>
            </div>
        );
    }
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func.isRequired
};

export default Card;
