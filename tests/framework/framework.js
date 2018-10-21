//
// framework.js
//
const events = require('events');

class TestContext {
    constructor() {
        this._messenger = new Messenger();
        this._currentTest = '(none)';
        this._isStarted = false;
        this._isComplete = false;
    }

    get messenger() {
        return this._messenger;
    }

    reset() {
        this._currentTest = '(none)';
        this._isComplete = false;
        this._isStarted = false;
    }

    get currentTest() {
        return this._currentTest;
    }
    set currentTest(v) {
        this._currentTest = v;
    }

    get isStarted() {
        return this._isStarted;
    }
    set isStarted(v) {
        this._isStarted = v;
    }

    get isComplete() {
        return this._isComplete;
    }
    set isComplete(v) {
        this._isComplete = v;
    }

    toString() {
        return `[TestContext: `
               + ` currentTest: ${this._currentTest}`
               + `, isStarted: ${this._isStarted}`
               + `, isComplete: ${this._isComplete}`
               + ` ]`;
    }
}

class Messenger {
    constructor() {
        this._emitter = new events.EventEmitter();
    }

    message(msg) {
        this._emitter.emit('message', msg);
    }

    error(err) {
        this._emitter.emit('error', err);
    }

    getEmitter() {
        return this._emitter;
    }
}

module.exports = {
    TestContext:    TestContext,
    Messenger:      Messenger
}