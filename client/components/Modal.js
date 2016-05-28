import React, { PropTypes } from 'react';
import assign from 'lodash/assign';
import Icon from './Icon';

const Modal = function ({
    title,
    children,
    hideModal,
    closeProps,
    closeTagName
}) {
    const closeNode = React.createElement(closeTagName, assign({}, closeProps, {
        className: 'b-modal-box__close',
        onClick: hideModal
    }), <Icon name="cross" />);

    return (
        <div className="b-modal">
            <div className="b-modal__box">
                <div className="b-modal-box">
                    <div className="b-modal-box__top">
                        <span className="b-modal-box__title"> 
                            {title}
                        </span>
                        {closeNode}
                    </div>
                    <div className="b-modal-box__content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    closeTagName: 'a'
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    hideModal: PropTypes.func.isRequired,
    closeTagName: PropTypes.string,
    closeProps: PropTypes.object
};

export default Modal;
