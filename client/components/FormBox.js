import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';
import Btn from './Btn';

class FormBox extends Component {
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
                className="b-form-box"
                onSubmit={this.handleSubmit}
            >
                <div className="b-form-box__rows">
                    {rows.map((row, i) => (
                        <label
                            className="b-form-box__row"
                            key={i}
                        >
                            {row}
                        </label>
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
                            nodeAttrs={{ type: 'submit' }}
                            modifiers={['md']}
                        />
                    </div>
                </div>
            </form>
        );
    }
};

FormBox.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.node).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
};

export default FormBox;
