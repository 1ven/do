import { assert } from 'chai';
import request from 'supertest';
import boardsApi from 'server/api/boards-api';
import listsApi from 'server/api/lists-api';
import app from 'server/.';
import fs from 'fs';
import db from 'server/db';
import { handleEndRequest } from '../helpers';

const createBoardsSql = fs.readFileSync('server/db/tables/boards.sql', 'utf8');
const createListsSql = fs.readFileSync('server/db/tables/lists.sql', 'utf8');

describe('lists routes', () => {
    beforeEach(() => {
        return db.query('DROP TABLE IF EXISTS boards, lists')
            .then(() => db.query(createBoardsSql))
            .then(() => db.query(createListsSql));
    });

    it('/lists/create should respond with json', (done) => {
        boardsApi.create({
            title: 'test board'
        })
        .then(result => {
            return request(app)
            .post('/lists/create')
            .send({
                title: "test",
                boardId: 1
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(handleEndRequest.bind(null, { success: true }, done));
        });
    });

    // it('/lists/remove should respond with json', (done) => {
    //     boardsApi.create({ title: 'test board' })
    //     .then(() => listsApi.create({ title: 'test list' }))
    //     .then(() => boardsApi.addList(1, 1))
    //     .then(() => { 
    //         return request(app)
    //         .post('/lists/remove')
    //         .send({
    //             boardId: 1,
    //             listId: 1
    //         })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(handleEndRequest.bind(null, { success: true }, done));
    //     });
    // });
});
