import React, { PropTypes } from 'react';
import Icon from './Icon';

function Modal({ title, children, onCloseClick }) {
  return (
    <div className="b-modal">
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
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
