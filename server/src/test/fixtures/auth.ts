export {};
const User = require('../../models/user');
import * as request from 'supertest';
import {App} from '../../app';

const app = new App().express;

const sendAuthRequest: Function = async function(method: string, 
    url: string, data: Object = null): Promise<request.Response> {

    const loginResponse = await request(app).post('/api/users/login')
        .send({
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(200);
    const token = loginResponse.body.token;
    
    let ret: request.Response = null;
    if(method === "post") {
        ret = await request(app).post('/api' + url)
            .send(data).set({"Authorization": "Bearer " + token});
    } else if(method === "get") {
        ret = await request(app).get('/api' + url).set({"Authorization": "Bearer " + token});
    } else if(method === "patch") {
        ret = await request(app).patch('/api' + url)
        .send(data).set({"Authorization": "Bearer " + token});
    } else if(method === "delete") {
        ret = await request(app).delete('/api' + url)
        .set({"Authorization": "Bearer " + token});
    } else {
        throw new Error("Must send a method");
    }

    await request(app).post('/api/users/logout').set({"Authorization": "Bearer " + token});

    return ret;
}

const clearTokens: Function = async function() {
    const users = User.find();
    for(let i = 0; i < users.length; i++) {
        users[i].tokens = [];
        await users[i].save();
    }
}

module.exports = {
    sendAuthRequest,
    clearTokens
}