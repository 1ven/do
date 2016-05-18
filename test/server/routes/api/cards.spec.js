import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import Card from 'server/models/Card';
import { authenticate } from '../../helpers';

const cardsData = [{
    id: shortid.generate(),
    text: 'test card 1'
}, {
    id: shortid.generate(),
    text: 'test card 2'
}];

describe('cards routes', () => {
    it('PUT /api/cards/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/cards/${cardsData[1].id}`)
                .send({
                    text: 'new text'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.property(card, 'id');
                    delete card.id;
                    assert.deepEqual(card, {
                        text: 'new text'
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/cards/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/cards/${cardsData[1].id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const cardId = res.body.result.id;

                    assert.equal(cardId, cardsData[1].id);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return authenticate()
        .then(request => {
            return Card.bulkCreate(cardsData)
                .then(() => request);
        });
};
