/* eslint-disable */
'use strict'

const   test   = require('tape'),
        Awake  = require('../');

function dummy_callback (done,time)
{
    done();
}

test('required', (assert) => {
    assert.notEqual(typeof Awake, 'undefined' ,'Should be defined');
    assert.equal(typeof Awake, 'function' ,'Should be a function');
    assert.end();
});

test('constants', (assert) => {
    assert.notEqual(typeof Awake.RequiredCallbackException, 'undefined' ,'Exception should be defined');
    assert.true(Awake.RequiredCallbackException instanceof Error, 'Should have RequiredCallbackException');
    assert.end();
});

test('methods', (assert) => {
    const awake = new Awake(dummy_callback);
    assert.equal(typeof awake.start, 'function' ,'Should be a function start()');
    assert.equal(typeof awake.stop, 'function' ,'Should be a function stop()');
    assert.equal(typeof awake.isRunning, 'function' ,'Should be a function isRunning()');
    assert.equal(typeof awake.pause, 'function' ,'Should be a function pause()');
    assert.equal(typeof awake.resume, 'function' ,'Should be a function resume()');
    assert.equal(typeof awake.isPaused, 'function' ,'Should be a function isPaused()');
    assert.equal(typeof awake.delay, 'function' ,'Should be a function delay()');
    assert.end();
});

test('state', (assert) => {
    const awake = new Awake(dummy_callback);
    assert.false(awake.isRunning(), 'Should not be running');
    assert.true(awake.isPaused(), 'Should be paused');
    assert.equal(awake.delay(), 1000, 'Should have delay of 1000ms');
    assert.end();
});