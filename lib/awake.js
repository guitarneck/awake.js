// JSDoc 3.5.5
/**
 * @class       Awake
 * @classdesc   Awake is a delayed callback trigger. 
 * @author      Laurent STEFAN <guitarneck@free.fr>
 * @since       Jan 21, 2019
 * @version     1.0.0
 * @copyright   2019 Laurent STEFAN. All rights reserved.
 * 
 * @constructor
 * @param {function}    callback    The task.
 * @param {number}      delay       The delay before running the task.
 *                                  Sets 0 for a one shot task.
 * @throws {RequiredCallbackException}     
 */   
"use strict";

const
    DELAY = 1000,

    /**
     * The Awake exception on callback missing.
     * @const       {Error}
     * @memberof    Awake
     * @readonly
     * @static
     */
    RequiredCallbackException = new Error( 'A callback is required' );

function Awake ( callback, delay )
{
    var _private;

    if ( typeof callback === 'undefined' ) throw RequiredCallbackException;
   
    // An object - To be passed to children, not by values
    _private = {
        callback : callback,
        delay    : typeof delay !== 'undefined' ? delay : DELAY,
        id       : null,
        paused   : true,
        running  : false,
        self     : this
    };
    
    /**
     * Tell if the Awake instance is running.
     * @method      isRunning
     * @memberof    Awake
     * @return      {boolean} True when running, false otherwise.
     */    
    this.isRunning = function ()
    {
        return _private.running
    }
    
    /**
     * Sets to pause the Awake instance.
     * @method      pause
     * @memberof    Awake
     * @returns     {void}
     */    
    this.pause = function ()
    {
        _private.paused = true
    }
    
    /**
     * Resume a paused Awake's instance.
     * @method      resume
     * @memberof    Awake
     * @returns     {void}
     */    
    this.resume = function ()
    {
        _private.paused = false
    }
    
    /**
     * Tell if the Awake instance is paused.
     * @method      isPaused
     * @memberof    Awake
     * @return      {boolean} True when paused, false otherwise.
     */    
    this.isPaused = function ()
    {
        return _private.paused
    }
    
    /**
     * Retrieve the delay for that task.
     * @method      delay
     * @memberof    Awake
     * @return      {number} The delay of the task.
     */    
    this.delay = function ()
    {
        return _private.delay
    }
    
    /**
     * Start the task, according to the delay.
     * @method      start
     * @memberof    Awake
     * @returns     {void}
     */    
    this.start = function ()
    {
        if ( _private.id !== null ) return;
    
        _private.running = false;
        _private.paused = false;

        var binding, runner;

        /*
        _private.id = setTimeout(function _runner (prv){
        
                if ( prv.running || prv.paused )
                {
                    prv.id = setTimeout(_runner,prv.delay,prv);
                    return;
                }
        
                prv.running = true;
                
                prv.callback(function done (){
                    prv.running = false;
                    prv.id = setTimeout(_runner,prv.delay,prv);
                },Date.now());
            },
            _private.delay,
            _private
        );
        */

        // For IE9 complience
        /* eslint prefer-destructuring: "off" */
        binding = {

            prv : _private,

            run : function ()
            {
                var loop, prv;

                prv = this.prv;
                loop = this.run.bind( this );

                if ( prv.running || prv.paused )
                {
                    prv.id = setTimeout( loop, prv.delay );
                    
                    return
                }
        
                prv.running = true;
                
                /* eslint func-names: "off" */
                prv.callback( function done ()
                {
                    prv.running = false;
                    if ( !!prv.delay ) prv.id = setTimeout( loop, prv.delay )
                    else prv.self.stop();
                }, Date.now() );
            }
        };

        runner = binding.run.bind( binding );
        
        _private.id = setTimeout( runner, _private.delay );
    }

    /**
     * Stop the running task.
     * @method      stop
     * @memberof    Awake
     * @returns     {void}
     */        
    this.stop = function ()
    {
        if ( _private.id === null ) return;

        clearTimeout( _private.id );
        _private.id = null;
        _private.running = false;
        _private.paused = true;
    }
}

Awake.prototype.RequiredCallbackException = RequiredCallbackException;
Awake.RequiredCallbackException = RequiredCallbackException;

module.exports = Awake;