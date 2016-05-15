import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import Board from 'server/models/Board';

chai.use(chaiAsPromised);

describe('Board', () => {
    // it('should create board and return created entry with declared in `defaultScope` attributes', () => {
    //     const title = 'test board';
    //     return Board.create({ title })
    //         .then(board => {
    //             assert.deepEqual(board.toJSON(), {
    //                 id: board.id,
    //                 title
    //             });
    //         });
    // });

    it('should return error message, when title is not provided', () => {
        const promise = Board.create();
        return assert.isRejected(promise, /Validation error/);
    });

    it('should return error message, when title is emty string', () => {
        const promise = Board.create({ title: '' });
        return assert.isRejected(promise, /Validation error/);
    });

    it('should generate valid shortid', () => {
        return Board.create({ title: 'test board' })
            .then(board => {
                assert.isTrue(shortid.isValid(board.id));
            });
    });

    // it('should be associated with card', () => {
    //     return Board.create({ title: 'test board' })
    //         .then(board => {
    //             return board.createCard({ text: 'test card' })
    //                 .then(card => {
    //                     const expected = _.assign({}, board.toJSON(), {
    //                         cards: [card.toJSON()],
    //                     });
    //                     return Board.findById(board.id)
    //                         .then(boardWithCard => {
    //                             console.log(boardWithCard.toJSON(), expected);
    //                             assert.deepEqual(boardWithCard.toJSON(), expected);
    //                         });
    //                 });
    //         });
    // });
});
