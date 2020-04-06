export {};
const User = require('../../models/user');
//const request = require('supertest');
import * as request from 'supertest';
import {App} from '../../app';

const app = new App().express;

const sendAuthRequest: Function = async function(method: string, 
    url: string, data: Object, token: string = null): Promise<request.Response> {
    if(!token) {
        const loginResponse = await request(app).post('/users/login')
            .send({
                email: "djdietrick@gmail.com",
                password: "password"
            }).expect(200);
        token = loginResponse.body.token;
    }
    
    if(method === "post") {
        return request(app).post(url)
            .send(data).set("Authentication", "Bearer " + token);
    } else if(method === "get") {
        return request(app).get(url).set("Authentication", "Bearer " + token);
    } else if(method === "patch") {
        return request(app).patch(url)
        .send(data).set("Authentication", "Bearer " + token);
    } else if(method === "delete") {
        return request(app).delete(url)
        .send(data).set("Authentication", "Bearer " + token);
    } else {
        throw new Error("Must send a method");
    }
}

module.exports = {
    sendAuthRequest
}