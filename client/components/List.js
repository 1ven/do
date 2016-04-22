import React, { PropTypes, Component } from 'react';
import CardsContainer from '../containers/CardsContainer';

class List extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
    }

    handleRemoveClick() {
        const { onRemoveClick, id } = this.props;
        onRemoveClick(id);
    }

    render() {
        const { id, title, cardsIds } = this.props;
        return (
            <div className="c-list">
                <div className="c-list__top">
                    <div className="c-list__top-left">
                        {title}
                    </div>
                    <div className="c-list__top-right">
                        <a
                            className="c-list__remove"
                            onClick={this.handleRemoveClick}
                        >X</a>
                    </div>
                </div>
                <div className="c-list__body">
                    <CardsContainer
                        listId={id}
                        cardsIds={cardsIds}
                    />
                </div>
            </div>
        );
    }
};

List.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cardsIds: PropTypes.array,
    onRemoveClick: PropTypes.func.isRequired
};

export default List;
