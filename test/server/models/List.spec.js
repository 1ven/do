import chai, { assert } from 'chai';
import _ from 'lodash';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import List from 'server/models/List';

chai.use(chaiAsPromised);

const listData = {
    id: shortid.generate(),
    title: 'test list'
};

const cardData = {
    id: shortid.generate(),
    text: 'test card'
};

describe('List', () => {
    describe('create', () => {
        it('should create list', () => {
            return List.create(listData)
                .then(list => {
                    const _list = list.toJSON();
                    assert.deepEqual(_list.title, listData.title);
                });
        });

        it('should generate valid shortid', () => {
            return List.create(_.assign({}, listData, { id: undefined }))
                .then(list => {
                    assert.isTrue(shortid.isValid(list.id));
                });
        });

        it('should return error message, when title is not provided', () => {
            const promise = List.create();
            return assert.isRejected(promise, /Validation error.*title must be not empty/);
        });

        it('should return error message, when title is emty string', () => {
            const promise = List.create({ title: '' });
            return assert.isRejected(promise, /Validation error.*title must be not empty/);
        });
    });

    describe('find', () => {
        it('should return list with attributes declared in `defaultScope` by default', () => {
            return List.create(listData)
                .then(list => {
                    return List.findById(list.id)
                })
                .then(entry => {
                    assert.deepEqual(entry.toJSON(), {
                        id: listData.id,
                        title: listData.title,
                        cards: []
                    });
                });
        });

        it('should include cards in response', () => {
            return List.create(listData)
                .then(list => list.createCard(cardData))
                .then(() => List.findById(listData.id))
                .then(list => {
                    const _list = list.toJSON();
                    assert.deepEqual(_list, {
                        id: listData.id,
                        title: listData.title,
                        cards: [{
                            id: cardData.id,
                            text: cardData.text
                        }]
                    });
                });
        });
    });

    describe('createCard', () => {
        it('should create card', () => {
            return List.create(listData)
                .then(list => list.createCard(cardData))
                .then(card => {
                    const _card = card.toJSON();
                    assert.equal(_card.id, cardData.id);
                    assert.equal(_card.title, cardData.title);
                    assert.equal(_card.listId, listData.id);
                    assert.lengthOf(_.keys(_card), 5);
                });
        });
    });

    describe('update', () => {
        it('should update list', () => {
            return List.create(listData)
                .then(list => {
                    return list.update({ title: 'test list 2' });
                })
                .then(list => {
                    assert.equal(list.title, 'test list 2');
                })
        });
    });
});
