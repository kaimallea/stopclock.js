/**
 * A StopClock ticks up or down and outputs time
 * in the format 'HH:MM:SS'
 *
 * @class StopClock
 * @constructor
 */
function StopClock(options) {

  // Default options
  this.options = {
    startTime: '0h0m',
    countDown: false,

    onTick: null,
    onZero: null
  };

  // Apply provided options
  if (typeof options === 'object') {
    for (var prop in options) {
      this.options[prop] = options[prop];
    }
  }

  // Also accept a single string for startTime
  if (typeof options === 'string') {
    this.options.startTime = options;
  }

  this.timerId = null;
  this.secondsElapsed = 0;
  this.hh = '00';
  this.mm = '00';
  this.ss = '00';

  // Set initial start time
  this.set(this.options.startTime);
}


/**
 * Stop ticking
 *
 * @method stop
 * @return {Object} Returns StopClock instance
 */
StopClock.prototype.stop = function() {
  if ( this.timerId ) {

    if ( this.options.angularTimer && typeof $timeout !== 'undefined') {
      $timeout.cancel( this.timerId );
    } else {
      clearInterval( this.timerId );
    }

    this.timerId = null;
  }

  return this;
};


/**
 * Start ticking
 *
 * @method start
 * @return {Object} Returns StopClock instance
 */
StopClock.prototype.start = function() {

  // Cancel existing timer
  this.stop();

  var self = this;
  if ( this.options.angularTimer && typeof $timeout !== 'undefined' ) {
    this.timerId = $timeout(function() {
      self.tick();
    }, 1000);
  } else {
    this.timerId = setInterval(function() {
      self.tick();
    }, 1000);
  }

  return this;
};


/**
 * Set time
 *
 * @method set
 * @param {String} Pretty time, e.g. "30m", "1hr30m", "1hr30m15s"
 * @return {Object} Returns StopClock instance
 */
StopClock.prototype.set = function(time) {
  this.secondsElapsed = this.parsePrettyTime(time).deltaSeconds;
  this.updateHands();
  return this;
}


/**
 * Update clock hands
 *
 * @method updateHands
 * @return {Object} Returns StopClock instance
 */
StopClock.prototype.updateHands = function() {
  this.hh = this.pad( parseInt(this.secondsElapsed / 3600, 10) );
  this.mm = this.pad( parseInt(this.secondsElapsed / 60, 10) );
  this.ss = this.pad( this.secondsElapsed % 60 );

  var mmToInt = parseInt(this.mm, 10);
  if (mmToInt >= 60) {
    this.mm = this.pad( this.mm - (parseInt(mmToInt/60, 10) * 60) );
  }

  return this;
}

/**
 * Pad a single digit by prepending it with a single zero
 *
 * @method pad
 * @param {Number}
 * @return {String} Returns number with padding
 */
StopClock.prototype.pad = function(num) {
   return num.toString().length > 1 ? num : '0' + num;
};


/**
 * Updates the StopClock instance's state every second (i.e., tick)
 *
 * @method tick
 * @return {Object} Returns StopClock instance
 */
StopClock.prototype.tick = function() {
  if (!this.options.countDown) {
    ++this.secondsElapsed;
  } else {
    --this.secondsElapsed;
  }

  this.updateHands();

  if (typeof this.options.onTick === 'function') {
    this.options.onTick.call(this);
  }

  if (this.toString() === '00:00:00') {
    this.stop();

    if (typeof this.options.onZero === 'function') {
      this.options.onZero.call(this);
    }
  }

  return this;
};


/**
 * Stringify the StopClock
 *
 * @method toString
 * @return {String} Returns time in "HH:MM:SS" format
 */
StopClock.prototype.toString = function() {
  return this.hh + ':' + this.mm + ':' + this.ss;
};


/**
 * Parses a string in a "pretty time" format (e.g., 1h 30m)
 *
 * @method parsePrettyTime
 * @return {Object} Returns object with properties representing the parsed time
 */
StopClock.prototype.parsePrettyTime = function(time) {
  if (!time || typeof time !== 'string') {
    time = '0h0m';
  }

  var format = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i,
      match = time.replace(/\s/g, '').match(format),
      hours = parseInt( (match[1] || 0), 10 ),
      minutes = parseInt( (match[2] || 0), 10 ),
      seconds = parseInt( (match[3] || 0), 10 ),
      delta = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000),
      deltaSeconds = delta / 1000;

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    delta:  delta,
    deltaSeconds: deltaSeconds
  };
};


/**
 * Check if the StopClock is running
 *
 * @method isRunning
 * @return {Boolean} Returns true or false
 */
StopClock.prototype.isRunning = function() {
  return !!this.timerId;
};
