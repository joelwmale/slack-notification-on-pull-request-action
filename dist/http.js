"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
var fetch = require('node-fetch');
var Http = (function () {
    function Http() {
    }
    Http.prototype.make = function (url, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fetch(url, _this.getOptions('post', body)).then(function (res) { return resolve(res); });
        });
    };
    Http.prototype.getOptions = function (method, payload) {
        var options = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: method
        };
        options.body = JSON.stringify(payload);
        return options;
    };
    return Http;
}());
exports.http = new Http();
//# sourceMappingURL=http.js.map