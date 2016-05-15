import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import List from 'server/models/List';

chai.use(chaiAsPromised);

describe('List', () => {
    it('should create list and return created entry', () => {
        const title = 'test list';
        return List.create({ title })
            .then(list => {
                assert.equal(list.title, title);
            });
    });

    it('should return error message, when title is not provided', () => {
        const promise = List.create();
        return assert.isRejected(promise, /Validation error/);
    });

    it('should return error message, when title is emty string', () => {
        const promise = List.create({ title: '' });
        return assert.isRejected(promise, /Validation error/);
    });

    it('should generate valid shortid', () => {
        return List.create({ title: 'test list' })
            .then(list => {
                assert.isTrue(shortid.isValid(list.id));
            });
    });

    // it('should be associated with card', () => {
    //     return List.create({ title: 'test list' })
    //         .then(list => {
    //             return list.createCard({ text: 'test card' })
    //                 .then(card => {
    //                     const expected = _.assign({}, list.get(), {
    //                         BoardId: null,
    //                         cards: [card.get()]
    //                     });
    //                     return List.findById(list.id)
    //                         .then(listWithCard => {
    //                             console.log(listWithCard.get(), expected);
    //                             assert.deepEqual(listWithCard.get(), expected);
    //                         });
    //                 });
    //         });
    // });
});
