import React, { PropTypes } from 'react';
import Icon from './Icon';

const Modal = function ({
    title,
    content,
    onCloseClick
}) {
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
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    onCloseClick: PropTypes.func.isRequired
};

export default Modal;
