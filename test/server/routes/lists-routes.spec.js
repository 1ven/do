import Promise from 'bluebird';
import db from 'server/db';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import { recreateTables } from '../helpers';

chai.use(chaiAsPromised);

describe('lists routes', () => {
    beforeEach(recreateTables);

    it('/lists/create should create list and place it id on board', (done) => {
        const boardId = 3;
        const listTitle = 'test list';

        db.none("INSERT INTO boards (title) values ('board 1'), ('board 2'), ('board 3')")
            .then(() => {
                request(app)
                .post('/lists/create')
                .set('Accept', 'application/json')
                .send({
                    title: listTitle,
                    boardId
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { done(err); }

                    assert.equal(res.body.success, true);

                    const listId = res.body.data.listId;

                    db.one('SELECT * FROM lists WHERE id = $1', [listId])
                        .then(list => assert.equal(list.title, listTitle))
                        .then(() => db.one('SELECT * FROM boards WHERE id = $1', [boardId]))
                        .then(board => {
                            assert.include(board.lists, listId);
                        })
                        .then(done, done);
                });
            });
    });

    it('/lists/remove should remove list itself and remove it id from board', (done) => {
        const boardId = 1;
        const listId = 2;

        db.none(`
            INSERT INTO boards (title, lists) values ('board 1', ARRAY[1, 2]);
            INSERT INTO lists (title) values ('list 1'), ('list 2');
        `)
            .then(() => {
                request(app)
                .post('/lists/remove')
                .send({ boardId, listId })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) { done(err); }

                    assert.equal(res.body.success, true);

                    db.one('SELECT * FROM boards WHERE id = $1', [boardId])
                        .then(board => {
                            assert.deepEqual(board.lists, [1]);
                        })
                        .then(() => {
                            const promise = db.one('SELECT * FROM lists WHERE id = $1', [listId]);
                            return expect(promise).to.be.rejectedWith(/No data returned from the query/);

                        })
                        .then(done, done);
                });
            });
    });
});
