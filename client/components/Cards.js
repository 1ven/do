import React, { PropTypes, Component } from 'react';
import InputForm from './InputForm';
import Card from './Card';
import Btn from './Btn';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInputFormVisible: false
        };

        this.handleInputFormCrossClick = this.handleInputFormCrossClick.bind(this);
        this.handleAddCardBtnClick = this.handleAddCardBtnClick.bind(this);
    }

    handleInputFormCrossClick() {
        this.setState({
            isInputFormVisible: false
        });
    }

    handleAddCardBtnClick() {
        this.setState({
            isInputFormVisible: true
        });
    }

    render() {
        const {
            cards,
            onCardCreate,
            onCardRemoveClick,
            onCardInputFormSubmit,
            onCardTextClick
        } = this.props;
        const { isInputFormVisible } = this.state;

        return (
            <div className="b-cards">
                {cards.map((card, i) =>
                    <div
                        key={i}
                        className="b-cards__item"
                    >
                        <Card
                            {...card}
                            onRemoveClick={onCardRemoveClick}
                            onInputFormSubmit={onCardInputFormSubmit}
                            onTextClick={onCardTextClick}
                        />
                    </div>
                )}
                <div className="b-cards__item">
                    {isInputFormVisible ? (
                        <InputForm
                            onSubmit={onCardCreate}
                            placeholder="Enter card text"
                            onCrossClick={this.handleInputFormCrossClick}
                            autoFocus={true}
                        />
                    ) : (
                        <Btn
                            text="Add new card"
                            modifiers={['full_width', 'sm']}
                            onClick={this.handleAddCardBtnClick}
                        />
                    )}
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
    onCardCreate: PropTypes.func.isRequired,
    onCardRemoveClick: PropTypes.func.isRequired,
    onCardInputFormSubmit: PropTypes.func.isRequired,
    onCardTextClick: PropTypes.func.isRequired
};

export default Cards;
