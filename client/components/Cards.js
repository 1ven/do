import React, { PropTypes, Component } from 'react';
import Card from './Card';
import Btn from './Btn';

class Cards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            cards,
            onCardRemoveClick,
            onCardClick,
            onAddCardBtnClick
        } = this.props;

        return (
            <div className="b-cards">
                {cards.map((card, i) =>
                    <div
                        key={i}
                        className="b-cards__item"
                    >
                        <Card
                            data={card}
                            onRemoveClick={onCardRemoveClick}
                            onClick={onCardClick}
                        />
                    </div>
                )}
                <div className="b-cards__item">
                    <Btn
                        text="Add new card"
                        modifiers={['full_width', 'sm']}
                        onClick={onAddCardBtnClick}
                    />
                </div>
            </div>
        );
    }
}

Cards.defaultProps = {
    cards: []
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string
    })),
    onAddCardBtnClick: PropTypes.func.isRequired,
    onCardRemoveClick: PropTypes.func.isRequired,
    onCardClick: PropTypes.func.isRequired
};

export default Cards;
