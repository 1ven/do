import React, { PropTypes, Component } from 'react';
import Btn from './Btn';
import Form from './Form';

class SendCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(formData) {
    this.setState({
      value: '',
    });
    this.props.onSubmit(formData);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <Form
        className="b-send-comment-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="b-input"
          value={this.state.value}
          onChange={this.handleInputChange}
          name="text"
          placeholder="Enter your text"
        />
        <div className="b-send-comment-form__submit">
          <Btn
            modifiers={['sm', 'full-width']}
            text="Send"
            type="Submit"
            tagName="button"
          />
        </div>
      </Form>
    );
  }
}

SendCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SendCommentForm;
