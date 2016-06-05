import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';
import Form from './Form';
import Btn from './Btn';

class FormBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(formData) {
        this.props.request(formData)
            .then(action => {
                if (!action.payload.error) {
                    return this.props.onSuccess(action.payload);
                }
                // check validation flag
                this.setState({
                    errors: action.payload.result
                });
            });
    }

    getError(name) {
        const error = this.state.errors.filter(e => e.name == name)[0];
        return error ? error.message : null;
    }

    render() {
        const { rows, onCancelClick } = this.props;
        const { errors } = this.state;

        return (
            <Form
                className="b-form-box"
                onSubmit={this.handleSubmit}
            >
                <div className="b-form-box__rows">
                    {rows.map((row, i) => (
                        <div
                            className="b-form-box__row"
                            key={i}
                        >
                            {React.cloneElement(row, {
                                error: this.getError(row.props.name)
                            })}
                        </div>
                    ))}
                </div>
                <div className="b-form-box__buttons">
                    <div className="b-form-box__button">
                        <Btn
                            text="Cancel"
                            onClick={onCancelClick}
                            modifiers={['red', 'md']}
                        />
                    </div>
                    <div className="b-form-box__button">
                        <Btn
                            text="Submit"
                            tagName="button"
                            nodeAttrs={{
                                type: 'submit'
                            }}
                            modifiers={['md']}
                        />
                    </div>
                </div>
            </Form>
        );
    }
};

FormBox.propTypes = {
    rows: PropTypes.array.isRequired,
    request: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
};

export default FormBox;
