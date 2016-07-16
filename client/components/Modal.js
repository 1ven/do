import React, { PropTypes, Component } from 'react';
import RoundSpinner from './RoundSpinner';
import Icon from './Icon';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleEscapeKeyUp = this.handleEscapeKeyUp.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleEscapeKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEscapeKeyUp);
  }

  handleEscapeKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  handleModalClick(e) {
    this.props.onClose();
  }

  handleBoxClick(e) {
    e.stopPropagation();
  }

  render() {
    const {
      title,
      children,
      isWaiting,
      onClose,
    } = this.props;
    return (
      <div
        className="b-modal"
        onClick={this.handleModalClick}
      >
        {isWaiting ? (
          <RoundSpinner
            size="30px"
            color="#fff"
            thickness="3px"
          />
        ) : (
          <div
            className="b-modal__box"
            onClick={this.handleBoxClick}
          >
            <div className="b-modal-box">
              <div className="b-modal-box__top">
                <span className="b-modal-box__title">
                  {title}
                </span>
                <a
                  className="b-modal-box__close"
                  onClick={onClose}
                >
                  <Icon name="cross" />
                </a>
              </div>
              <div className="b-modal-box__content">
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
