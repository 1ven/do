import { assert } from 'chai';
import _ from 'lodash';
import shortid from 'shortid';
import List from 'server/models/List';
import { authenticate } from '../../helpers';

const listsData = [{
    id: shortid.generate(),
    title: 'test list 1'
}, {
    id: shortid.generate(),
    title: 'test list 2'
}];

describe('lists routes', () => {
    it('POST /api/lists/:id/cards should respond with 201 and return created card', (done) => {
        setup().then(request => {
            request
                .post(`/api/lists/${listsData[1].id}/cards`)
                .send({
                    text: 'test card'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const card = res.body.result;

                    assert.property(card, 'id');
                    delete card.id;
                    assert.deepEqual(card, {
                        text: 'test card'
                    });

                    done();
                });
        }).catch(done);
    });

    it('PUT /api/lists/:id should respond with 200 and return updated entry', (done) => {
        setup().then(request => {
            request
                .put(`/api/lists/${listsData[1].id}`)
                .send({
                    title: 'new title'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const list = res.body.result;

                    assert.property(list, 'id');
                    delete list.id;
                    assert.deepEqual(list, {
                        title: 'new title',
                        cards: []
                    });

                    done();
                });
        }).catch(done);
    });

    it('DELETE /api/lists/:id should respond with 200 and return deleted entry id', (done) => {
        setup().then(request => {
            request
                .delete(`/api/lists/${listsData[1].id}`)
                .expect(200)
                .end((err, res) => {
                    if (err) { return done(err); }

                    const listId = res.body.result.id;

                    assert.equal(listId, listsData[1].id);

                    done();
                });
        }).catch(done);
    });
});

function setup() {
    return authenticate()
        .then(request => {
            return List.bulkCreate(listsData)
                .then(() => request);
        });
};
