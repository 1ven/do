import chai, { assert } from 'chai';
import _ from 'lodash';
import db from 'server/db';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import Card from 'server/models/Card';

chai.use(chaiAsPromised);

const cardData = {
    id: shortid.generate(),
    text: 'test card'
};

describe('Card', () => {
    describe('create', () => {
        it('should create card', () => {
            return Card.create(cardData)
                .then(card => {
                    const _card = card.toJSON();
                    assert.equal(_card.text, cardData.text);
                });
        });

        it('should generate valid shortid', () => {
            return Card.create(_.assign({}, cardData, { id: undefined }))
                .then(card => {
                    assert.isTrue(shortid.isValid(card.id));
                });
        });

        it('should return error message, when text is not provided', () => {
            const promise = Card.create();
            return assert.isRejected(promise, /Validation error.*must be not empty/);
        });

        it('should return error message, when text is emty string', () => {
            const promise = Card.create({ text: '' });
            return assert.isRejected(promise, /Validation error.*must be not empty/);
        });
    });

    describe('find', () => {
        it('should return card with attributes declared in `defaultScope` by default', () => {
            return Card.create(cardData)
                .then(card => {
                    return Card.findById(card.id)
                })
                .then(entry => {
                    assert.deepEqual(entry.toJSON(), cardData);
                });
        });
    });

    describe('update', () => {
        it('should update card', () => {
            return Card.create(cardData)
                .then(card => {
                    return card.update({ text: 'text 2' });
                })
                .then(card => {
                    assert.equal(card.text, 'text 2');
                })
        });
    });

    describe('delete', () => {
        // TODO: possible use delete with truncate/cascade option
        it('should delete card, and delete it reference in lists relation table');
    });
});
