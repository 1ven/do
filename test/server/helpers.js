import request from 'supertest';
import Promise from 'bluebird';
import app from 'server/.';

export function authenticate() {
    // authentication is not implemented yet
    const authRequest = request.agent(app);

    return new Promise((resolve, reject) => {
        resolve(authRequest);
    });
};
