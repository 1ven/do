import { assert } from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Notice from 'client/components/Notice';

const setup = () => {
    const props = {
        message: 'Test message',
        type: 'info',
        onClick: sinon.spy()
    };
    const component = shallow(<Notice {...props} />);

    return {
        message: component.find('a.c-notice__message'),
        props
    };
};

describe('<Notice />', () => {
    it('should render message', () => {
        const { message, props } = setup();

        assert(message.text(), props.message);
    });

    it('should set type className', () => {
        const { message, props } = setup();
        const className = 'c-notice__message_info';

        assert(message.hasClass(className), `message element has not "${className}" class`);
    });

    it('should handle message onClick event', () => {
        const { message, props } = setup();

        message.simulate('click');
        assert.equal(props.onClick.callCount, 1);
    });
});
