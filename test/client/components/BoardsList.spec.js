import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import BoardsList from 'client/components/BoardsList';

const setup = () => {
    const props = {
        boards: [
            { id: 1, title: 'board 1' },
            { id: 2, title: 'board 2' }
        ],
        onBoardClick: sinon.spy(),
        onBoardCreatorSubmit: sinon.spy()
    };
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

    it('should pass onBoardClick callback to <BoardTile /> onClick prop', () => {
        const { props, boardTiles } = setup();

        boardTiles.forEach(tile => tile.props().onClick());
        assert.equal(props.onBoardClick.callCount, boardTiles.length);
    });

    it('should pass onBoardCreatorSubmit callback to <BoardCreator /> onSubmit prop', () => {
        const { props, boardCreator } = setup();

        boardCreator.props().onSubmit();
        assert.equal(props.onBoardCreatorSubmit.callCount, 1);
    });
});
