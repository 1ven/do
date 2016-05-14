import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';
import Btn from './Btn';

class ModalForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formNode = ReactDOM.findDOMNode(this.refs.form);
        const formData = serialize(formNode, {
            hash: true
        });

        this.props.onSubmit(formData);
    }

    render() {
        const {
            rows,
            onCancelClick
        } = this.props;

        return (
            <form
                ref="form"
                className="b-modal-form"
                onSubmit={this.handleSubmit}
            >
                <div className="b-modal-form__rows">
                    {rows.map((row, i) => (
                        <label
                            className="b-modal-form__row"
                            key={i}
                        >
                            {row}
                        </label>
                    ))}
                </div>
                <div className="b-modal-form__buttons">
                    <div className="b-modal-form__button">
                        <Btn
                            text="Cancel"
                            onClick={onCancelClick}
                            modifiers={['red']}
                        />
                    </div>
                    <div className="b-modal-form__button">
                        <Btn
                            text="Submit"
                            tagName="button"
                            nodeAttrs={{ type: 'submit' }}
                        />
                    </div>
                </div>
            </form>
        );
    }
};

ModalForm.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.node).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
};

export default ModalForm;
