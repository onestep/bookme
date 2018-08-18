"use strict";

exports.Promise = function (executor) {
    this._onFulfilled = null;
    this._onRejected = null;

    executor(this.resolve.bind(this), this.reject.bind(this))
};

exports.Promise.prototype.resolve = function (value) {
    if (typeof this._onFulfilled === "function") {
        this._onFulfilled(value);
    }
};

exports.Promise.prototype.reject = function (reason) {
    if (typeof this._onRejected === "function") {
        this._onRejected(reason);
    }
};

exports.Promise.prototype.then = function (onFulfilled, onRejected) {
    this._onFulfilled = onFulfilled;
    this._onRejected = onRejected;
};