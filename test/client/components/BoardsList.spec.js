import React from 'react';
import sinon from 'sinon';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardsList from 'client/components/BoardsList';

const setup = (customProps = {}) => {
    const props = _.assign({}, {
        boards: [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ],
        onBoardCreatorSubmit: sinon.spy(),
        loading: false
    }, customProps);
    const component = shallow(<BoardsList {...props} />);

    return {
        boardTiles: component.find('BoardTile'),
        boardCreator: component.find('BoardCreator'),
        component,
        props
    };
};

describe('<BoardsList />', () => {
    it('should render boards', () => {
        const { props, boardTiles } = setup();

        assert.equal(boardTiles.length, 2);
    });

    it('should pass board object to <BoardTile /> data prop', () => {
        const { props, boardTiles } = setup();

        props.boards.forEach((board, i) => {
            assert.deepEqual(boardTiles.at(i).props().data, board);
        });
    });

    it('should pass onBoardCreatorSubmit callback to <BoardCreator /> onSubmit prop', () => {
        const { props, boardCreator } = setup();

        boardCreator.props().onSubmit();
        assert.equal(props.onBoardCreatorSubmit.callCount, 1);
    });

    // it('should render loader when boards are loading', () => {
    //     const { props, component } = setup({ loading: true });

    //     assert.equal(component.find('.c-boards-list__loader').length, 1);
    // });

    // it('should render loader by default', () => {
    //     const { props, component } = setup({ loading: undefined });

    //     assert.equal(component.find('.c-boards-list__loader').length, 1);
    // });
});
