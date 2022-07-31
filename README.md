# Awake.js

A class to delay a task and/or to control a task in a thread way, with start, stop, pause and resume.

A task cannot then run more than once at a time, to prevent concurency running.

# Install

```bash
$ npm i awake.js
```

# Class Awake

## constructor

### ``new Awake(function, [integer])``

```javascript
/**
 * @constructor
 * @param {function}    callback    The task.
 * @param {number}      delay       The delay before running the task.
 *                                  Sets 0 for a one shot task.
 * @throws {RequiredCallbackException}
 */
function Awake ( callback, delay )
```

## Methods

### ``delay()``

```javascript
    /**
     * Retrieve the delay for that task.
     * @method      delay
     * @memberof    Awake
     * @return      {number} The delay of the task.
     */
    function delay ()
```

### ``isPaused()``

```javascript
    /**
     * Tell if the Awake instance is paused.
     * @method      isPaused
     * @memberof    Awake
     * @return      {boolean} True when paused, false otherwise.
     */
   function isPaused ()
```

### ``isRunning()``

```javascript
    /**
     * Tell if the Awake instance is running.
     * @method      isRunning
     * @memberof    Awake
     * @return      {boolean} True when running, false otherwise.
     */
    function isRunning ()
```

### ``pause()``

```javascript
    /**
     * Sets to pause the Awake instance.
     * @method      pause
     * @memberof    Awake
     * @returns     {void}
     */
    function pause ()
```

### ``resume()``

```javascript
    /**
     * Resume a paused Awake's instance.
     * @method      resume
     * @memberof    Awake
     * @returns     {void}
     */
    function resume ()
```

### ``start()``

```javascript
    /**
     * Start the task, according to the delay.
     * @method      start
     * @memberof    Awake
     * @returns     {void}
     */
    function start ()
```

### ``stop()``

```javascript
    /**
     * Stop the running task.
     * @method      stop
     * @memberof    Awake
     * @returns     {void}
     */
    function stop ()
```
## callback

```javascript
   /**
    * The callback function.
    * @function
    * @param {function}    done  The function to call at the end of the loop.
    * @param {number}      time  The started timestamp of the loop.
    */
   function ( done, time )
```

# Usage
```javascript
const util = require('util');
const Awake = require('.');

let counter = 0;

const wake = new Awake( (done, time) => {
   console.log( util.format("I was called at %i, %i times", time, ++counter) );
   // do someting interesting...
   done();
   if ( counter === 10 ) wake.stop();
},500);

wake.start();
```

# License

[MIT © guitarneck](./LICENSE)