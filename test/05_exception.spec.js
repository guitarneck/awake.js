/* eslint-disable */
'use strict'

const   test   = require('tape'),
        Awake  = require('../');

test('bad instanciation', (assert) => {
    assert.throws(() => new Awake(), Awake.RequiredCallbackException, `Should throw '${Awake.RequiredCallbackException}'`);
    assert.end();
});

test('good instanciation', (assert) => {
    assert.doesNotThrow(() => new Awake((done)=>done()), Awake.RequiredCallbackException, `Should not throw '${Awake.RequiredCallbackException}'`);
    assert.end();
});