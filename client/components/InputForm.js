import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';
import Btn from './Btn';
import Input from './Input';

class InputForm extends Component {
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
                className="b-input-form"
                onSubmit={this.handleSubmit}
                ref="form"
            >
                <div className="b-input-form__area">
                    <Input
                        value={data.text}
                        focus={true}
                        name="text"
                    />
                </div>
                <div className="b-input-form__buttons">
                    <div className="b-input-form__button">
                        <Btn
                            modifiers={['sm']}
                            text="Save"
                            type="Submit"
                            tagName="button"
                        />
                    </div>
                    {onCancel ? (
                        <div className="b-input-form__button">
                            <Btn
                                modifiers={['sm', 'red']}
                                text="Cancel"
                                onClick={onCancel}
                            />
                        </div>
                    ) : false}
                </div>
            </form>
        );
    }
}

InputForm.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};

export default InputForm;
