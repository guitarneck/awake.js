/* eslint-disable */
'use strict'

const   test   = require('tape'),
        Awake  = require('../');

test('access to binded properties', (assert) => {
    
    assert.plan(13);

    const awake00 = new Awake(function not_anonymous (done,time)
    {
        assert.notEqual(typeof this.delay,'undefined','property delay is here.');
        assert.equal(this.delay,0,'delay is known.');
        assert.notEqual(typeof this.callback,'undefined','property callback is here.');
        assert.equal(this.callback.name,'not_anonymous','the callback name is known.');
        assert.notEqual(typeof this.id,'undefined','property id is here.');
        assert.notEqual(this.id,null,'property id is not null.');
        assert.notEqual(typeof this.paused,'undefined','property paused is here.');
        assert.false(this.paused,'task is not paused.');
        assert.notEqual(typeof this.running,'undefined','property running is here.');
        assert.true(this.running,'task is running.')
        assert.notEqual(typeof this.self,'undefined','property self is here.');
        assert.equal(this.self,awake00,'self is me.');
        assert.equal(this.self.delay(),this.delay,'self is me without any doubt.');
        done();
        awake00.stop();
    },0);
    
    awake00.start();
});