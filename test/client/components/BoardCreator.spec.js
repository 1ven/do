import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardCreator from 'client/components/BoardCreator';

const setup = () => {
    const props = {
        onSubmit: sinon.spy()
    };
    const component = shallow(<BoardCreator {...props} />);

    return {
        boardCreatorForm: component.find('form.c-board-creator'),
        input: component.find('input.c-board-creator__input'),
        preventDefault: sinon.spy(),
        component,
        props
    };
};

describe('<BoardCreator />', () => {
    it('should handle onSubmit event and prevent default form behavior', () => {
        const { boardCreatorForm, input, preventDefault, props } = setup();

        input.simulate('change', { target: { value: 'test board' } });
        boardCreatorForm.simulate('submit', { preventDefault });

        assert.equal(preventDefault.callCount, 1, 'preventDefault is not called');
        assert.equal(props.onSubmit.callCount, 1, 'onSubmit is not called');
    });

    it('should not handle onSubmit event, when input has no text', () => {
        const { boardCreatorForm, preventDefault, props } = setup();

        boardCreatorForm.simulate('submit', { preventDefault });

        assert.equal(props.onSubmit.callCount, 0, 'onSubmit is called');
    });

    it('should pass title to onSubmit function', () => {
        const { boardCreatorForm, input, preventDefault, props } = setup();
        const title = 'test board';

        input.simulate('change', { target: { value: title } });
        boardCreatorForm.simulate('submit', { preventDefault });

        assert(props.onSubmit.calledWith(title), `onSubmit is not called with "${title}"`);
    });

    it('should clear input after submit', () => {
        const { boardCreatorForm, input, component, preventDefault } = setup();

        input.simulate('change', { target: { value: 'test' } });
        boardCreatorForm.simulate('submit', { preventDefault });

        assert.equal(component.state().inputValue, '');
    });
});
