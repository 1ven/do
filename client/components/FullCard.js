import React, { PropTypes, Component } from 'react';
import InputForm from './InputForm';
import Comments from './Comments';

class FullCard extends Component {
    constructor(props) {
        super(props);

        this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this);

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

    handleInputFormSubmit(formData) {
        this.props.onInputFormSubmit(formData)
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
                        <InputForm
                            data={data}
                            onSubmit={this.handleInputFormSubmit}
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
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    onInputFormSubmit: PropTypes.func.isRequired
};

export default FullCard;
