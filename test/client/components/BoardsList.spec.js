import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardsList from 'client/components/BoardsList';
import BoardTile from 'client/components/BoardTile';

const setup = () => {
    const props = {
        boards: [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ],
        onBoardClick: sinon.spy()
    };
    const component = shallow(<BoardsList {...props} />);

    return {
        boardTiles: component.find(BoardTile),
        component,
        props
    };
};

describe('<BoardsList />', () => {
    it('should render boards', () => {
        const { props, boardTiles } = setup();

        assert.equal(boardTiles.length, 2);
    });

    it('should pass board data object to <BoardTile />', () => {
        const { props, boardTiles } = setup();

        props.boards.forEach((board, i) => {
            assert.deepEqual(boardTiles.at(i).props().data, board);
        });
    });

    it('should pass onBoardClick callback to <BoardTile />', () => {
        const { props, boardTiles } = setup();

        boardTiles.forEach(node => node.simulate('click'));
        assert.equal(props.onBoardClick.callCount, boardTiles.length);
    });
});
