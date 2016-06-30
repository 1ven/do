import React, { PropTypes, Component } from 'react';
import RoundSpinner from './RoundSpinner';
import Icon from './Icon';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onEscapeKeyUp = this.onEscapeKeyUp.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onEscapeKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onEscapeKeyUp);
  }

  onEscapeKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  onDocumentClick(e) {
    
  }

  render() {
    const {
      title,
      children,
      isWaiting,
      onClose,
    } = this.props;
    return (
      <div className="b-modal">
        {isWaiting ? (
          <RoundSpinner
            size="30px"
            color="#fff"
            thickness="3px"
          />
        ) : (
          <div className="b-modal__box">
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
