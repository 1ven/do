import React, { PropTypes, Component } from 'react';
import EditCardForm from './EditCardForm';
import Comments from './Comments';

class FullCard extends Component {
    constructor(props) {
        super(props);

        this.handleEditCardFormSubmit = this.handleEditCardFormSubmit.bind(this);

        this.state = {
            isEditing: false
        };
    }

    hideEditForm() {
        this.setState({
            isEditing: false
        });
    }

    showEditForm() {
        this.setState({
            isEditing: true
        });
    }

    handleEditCardFormSubmit(formData) {
        this.props.onEditCardFormSubmit(formData)
            .then(() => this.hideEditForm());
    }

    render() {
        const { isEditing } = this.state;
        const { data } = this.props;

        const comments = [{
            username: 'Aiven',
            avatar: 'http://placehold.it/100x100/ffffff/000000',
            date: '10/10/2016',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel bibendum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean malesuada, quam non aliquam pretium, est est finibus nisl'
        }, {
            username: 'Aiven',
            avatar: 'http://placehold.it/100x100/ffffff/000000',
            date: '10/10/2016',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel bibendum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean malesuada, quam non aliquam pretium, est est finibus nisl'
        }, {
            username: 'Aiven',
            avatar: 'http://placehold.it/100x100/ffffff/000000',
            date: '10/10/2016',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel bibendum est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean malesuada, quam non aliquam pretium, est est finibus nisl'
        }];

        return (
            <div className="b-full-card">
                <div className="b-full-card__text">
                    {isEditing ? (
                        <EditCardForm
                            data={data}
                            onSubmit={this.handleEditCardFormSubmit}
                            onCancel={() => this.hideEditForm()}
                        />
                    ) : (
                        <div className="b-card-text">
                            <div className="b-card-text__text">
                                {data.text}
                            </div>
                            <a
                                className="b-card-text__edit"
                                onClick={() => this.showEditForm()}
                            >
                                Edit text
                            </a>
                        </div>
                    )}
                </div>
                <div className="b-full-card__comments">
                    <Comments
                        comments={comments}
                    />
                </div>
            </div>
        );
    }
};

FullCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    onEditCardFormSubmit: PropTypes.func.isRequired
};

export default FullCard;
