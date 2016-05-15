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
                const _list = list.toJSON();
                assert.deepEqual(_list.title, title);
            });
    });

    it('should return list with attributes declared in `defaultScope`', () => {
        const title = 'test list';
        return List.create({ title })
            .then(list => {
                return List.findById(list.id)
                    .then(entry => {
                        assert.deepEqual(entry.toJSON(), {
                            id: list.id,
                            cards: [],
                            title
                        });
                    });
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

    it('should be associated to card', () => {
        return List.create({ id: 1, title: 'test list' })
            .then(list => list.createCard({ id: 1, text: 'test card' }))
            .then(() => List.findById(1))
            .then(list => {
                const _list = list.toJSON();
                assert.deepEqual(_list, {
                    id: '1',
                    title: 'test list',
                    cards: [{
                        id: '1',
                        text: 'test card'
                    }]
                });
            });
    });
});
