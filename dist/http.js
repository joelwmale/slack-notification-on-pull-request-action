"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const fetch = require('node-fetch');
class Http {
    make(url, body) {
        return new Promise((resolve, reject) => {
            fetch(url, this.getOptions('post', body)).then((res) => resolve(res));
        });
    }
    getOptions(method, payload) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
            method
        };
        // set the body
        options.body = JSON.stringify(payload);
        return options;
    }
}
exports.http = new Http();
