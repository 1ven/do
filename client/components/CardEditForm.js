import React, { PropTypes, Component } from 'react';
import serialize from 'form-serialize';
import Input from './Input';
import Btn from './Btn';

class CardEditForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formNode = this.refs.form;
        const formData = serialize(formNode, {
            hash: true
        });

        this.props.onSubmit(formData);
    }

    render() {
        const { data, onCancel } = this.props;

        return (
            <form
                className="b-card-edit"
                onSubmit={this.handleSubmit}
                ref="form"
            >
                <div className="b-card-edit__area">
                    <Input
                        value={data.text}
                        focus={true}
                        name="text"
                    />
                </div>
                <div className="b-card-edit__buttons">
                    <div className="b-card-edit__button">
                        <Btn
                            modifiers={['sm']}
                            text="Save"
                            type="Submit"
                            tagName="button"
                        />
                    </div>
                    <div className="b-card-edit__button">
                        <Btn
                            modifiers={['sm', 'red']}
                            text="Cancel"
                            onClick={onCancel}
                        />
                    </div>
                </div>
            </form>
        );
    }
};

CardEditForm.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    })
};

export default CardEditForm;
