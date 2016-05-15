import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';

import Card from 'server/models/Card';

chai.use(chaiAsPromised);

describe('Card', () => {
    describe('create', () => {
        it('should create card', () => {
            return Card.create({ text: 'test card' })
                .then(card => {
                    const _card = card.toJSON();
                    assert.equal(_card.text, 'test card');
                });
        });

        it('should generate valid shortid', () => {
            return Card.create({ text: 'test card' })
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
            const text = 'test card';
            return Card.create({ text })
                .then(card => {
                    return Card.findById(card.id)
                        .then(entry => {
                            assert.deepEqual(entry.toJSON(), {
                                id: card.id,
                                text
                            });
                        });
                });
        });
    });
});
