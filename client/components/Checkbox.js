import React, { PropTypes, Component } from 'react';
import Icon from './Icon';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isChecked: props.attrs.checked || false
        };
    }

    handleChange() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const { isChecked } = this.state;
        const { attrs, text } = this.props;
        return (
            <label className="b-checkbox">
                <input
                    {...attrs}
                    className="b-checkbox__native"
                    type="checkbox"
                    onChange={this.handleChange}
                />
                <span className="b-checkbox__icon">
                    { isChecked ? (
                        <Icon name="checkmark" />
                    ) : (
                        null
                    ) }
                </span>
                <span className="b-checkbox__text">
                    { text }
                </span>
            </label>
        );
    }
};

Checkbox.propTypes = {
    attrs: PropTypes.object,
    text: PropTypes.string.isRequired
};

export default Checkbox;
