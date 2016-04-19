import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import InputForm from 'client/components/InputForm';

const setup = () => {
    const props = {
        onSubmit: sinon.spy()
    };
    const component = shallow(<InputForm {...props} />);

    return {
        form: component.find('form.c-input-form'),
        input: component.find('input.c-input-form__input'),
        preventDefault: sinon.spy(),
        component,
        props
    };
};

describe('<InputForm />', () => {
    it('should handle onSubmit event and prevent default form behavior', () => {
        const { form, input, preventDefault, props } = setup();

        input.simulate('change', { target: { value: 'test value' } });
        form.simulate('submit', { preventDefault });

        assert.equal(preventDefault.callCount, 1, 'preventDefault is not called');
        assert.equal(props.onSubmit.callCount, 1, 'onSubmit is not called');
    });

    it('should not handle onSubmit event, when input has no text', () => {
        const { form, preventDefault, props } = setup();

        form.simulate('submit', { preventDefault });

        assert.equal(props.onSubmit.callCount, 0, 'onSubmit is called');
    });

    it('should pass title to onSubmit function', () => {
        const { form, input, preventDefault, props } = setup();
        const title = 'test value';

        input.simulate('change', { target: { value: title } });
        form.simulate('submit', { preventDefault });

        assert(props.onSubmit.calledWith(title), `onSubmit is not called with "${title}"`);
    });

    it('should clear input after submit', () => {
        const { form, input, component, preventDefault } = setup();

        input.simulate('change', { target: { value: 'test' } });
        form.simulate('submit', { preventDefault });

        assert.equal(component.state().inputValue, '');
    });
});
