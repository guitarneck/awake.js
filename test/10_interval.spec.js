/* eslint-disable */
'use strict'

const   test   = require('tape'),
        Awake  = require('../');

test('single callback', (assert) => {
    
    assert.plan(1);

    const awake00 = new Awake(dummy_callback);
    function dummy_callback (done,time)
    {
        assert.pass('dummy_callback was called once');
        done();
        awake00.stop();
    }
    
    awake00.start();
});

test('double callback', (assert) => {
    
    assert.plan(3);

    let count10 = 0;

    const awake10 = new Awake( (done) => {
        assert.equal( ++count10, 1 ,'count should equal 1');
        done();
        awake10.stop();
    });

    const awake11 = new Awake( (done) => {
        assert.false( awake10.isRunning() ,'awake10 should has stoped');
        assert.equal( ++count10, 2 ,'count should equal 2');
        done();
        awake11.stop();
    }, 1500);
    
    awake10.start();
    awake11.start();
});

test('awake is frozen', (assert) => {

    let count20 = 0;

    const awake20 = new Awake( (done) => {
        assert.equal( ++count20, 1 ,'count should equal 1');
    },200);

    awake20.start();
    
    setTimeout( () => {
        assert.true( awake20.isRunning() ,'awake should be running');
        setTimeout( () => {
            awake20.stop();
            assert.equal(count20, 1 ,'count should still equal 1');
            assert.end();   
        },500); 
    },500); 

});

test('awake is paused and resumed', (assert) => {
    
    let count30 = 0;

    const awake30 = new Awake( (done) => {
        count30++;
        done();
    },50);

    awake30.start();
    
    setTimeout( () => {
        assert.false( awake30.isPaused() ,'awake should not be paused');
        awake30.pause();
        setTimeout( () => {
            assert.true( awake30.isPaused() ,'awake should be paused');
            awake30.resume();
            setTimeout( () => {
                assert.false( awake30.isPaused() ,'awake should be resumed');
                awake30.stop();
                assert.end();   
            },200);
        },200);
    },200); 

});

test('a single run', (assert) => {
  let count40 = 0;

  const awake40 = new Awake( (done) => {
    count40++;
    done();
  },0);

  awake40.start();

  setTimeout( () => {
    assert.false( awake40.isRunning() ,'awake should not be running');
    assert.equal( count40, 1, 'counter is 1');
    assert.end();
  }, 100);

});