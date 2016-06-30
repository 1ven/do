import React, { PropTypes, Component } from 'react';
import RoundSpinner from './RoundSpinner';
import Icon from './Icon';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onEscapeKeyUp = this.onEscapeKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onEscapeKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onEscapeKeyUp);
  }

  onEscapeKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onCloseClick();
    }
  }

  render() {
    const {
      title,
      children,
      isWaiting,
      onCloseClick,
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
                  onClick={onCloseClick}
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
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
