import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import shortid from 'shortid';
import { models } from 'server/db';

chai.use(chaiAsPromised);

const Card = models.Card;

describe('Card', () => {
    it('should create card and return created entry', () => {
        const text = 'test card';
        return Card.create({ text })
            .then(card => {
                assert.equal(card.text, text);
            });
    });

    it('should return error message, when text is not provided', () => {
        const promise = Card.create();
        return assert.isRejected(promise, /Validation error.*Card text must be not empty/);
    });

    it('should return error message, when text is emty string', () => {
        const promise = Card.create({ text: '' });
        return assert.isRejected(promise, /Validation error.*Card text must be not empty/);
    });

    it('should generate valid shortid', () => {
        return Card.create({ text: 'test card' })
            .then(card => {
                assert.isTrue(shortid.isValid(card.id));
            });
    });
});
