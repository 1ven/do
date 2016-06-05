import React, { PropTypes } from 'react';
import assign from 'lodash/assign';
import Icon from './Icon';
import Btn from './Btn';

const Modal = function ({
    title,
    children,
    hideModal
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
                            onClick={hideModal}
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
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    hideModal: PropTypes.func.isRequired,
};

export default Modal;
