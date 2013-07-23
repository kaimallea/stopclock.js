describe('parsePrettyTime() with no args', function() {
    var stopclock = new StopClock();

    it('hours should be 0', function() {
        var result = stopclock.parsePrettyTime().hours;
        expect(result).toBe(0);
    });

    it('minutes should be 0', function() {
        var result = stopclock.parsePrettyTime().minutes;
        expect(result).toBe(0);
    });

    it('seconds should be 0', function() {
        var result = stopclock.parsePrettyTime().seconds;
        expect(result).toBe(0);
    });

    it('delta should be 0', function() {
        var result = stopclock.parsePrettyTime().delta;
        expect(result).toBe(0);
    });

    it('deltaSeconds should be 0', function() {
        var result = stopclock.parsePrettyTime().deltaSeconds;
        expect(result).toBe(0);
    });
});

describe('parsePrettyTime() with seconds only (30s)', function() {
    var stopclock = new StopClock(),
        time = '30s';

    it('hours should be 0', function() {
        var result = stopclock.parsePrettyTime(time).hours;
        expect(result).toBe(0);
    });

    it('minutes should be 0', function() {
        var result = stopclock.parsePrettyTime(time).minutes;
        expect(result).toBe(0);
    });

    it('seconds should be 30', function() {
        var result = stopclock.parsePrettyTime(time).seconds;
        expect(result).toBe(30);
    });

    it('delta should be seconds*1000', function() {
        var result = stopclock.parsePrettyTime(time).delta,
            seconds = stopclock.parsePrettyTime(time).seconds;
        expect(result).toEqual(seconds*1000);
    });

    it('deltaSeconds should be equal delta/1000', function() {
        var result = stopclock.parsePrettyTime(time).deltaSeconds,
            delta = stopclock.parsePrettyTime(time).delta;
        expect(result).toEqual(delta/1000);
    });
});

describe('parsePrettyTime() with minutes only (30m)', function() {
    var stopclock = new StopClock(),
        time = '30m';

    it('hours should be 0', function() {
        var result = stopclock.parsePrettyTime(time).hours;
        expect(result).toBe(0);
    });

    it('minutes should be 30', function() {
        var result = stopclock.parsePrettyTime(time).minutes;
        expect(result).toBe(30);
    });

    it('seconds should be 0', function() {
        var result = stopclock.parsePrettyTime(time).seconds;
        expect(result).toBe(0);
    });

    it('delta should be ', function() {
        var result = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(1800000); // 30*60*1000
    });

    it('deltaSeconds should be equal delta/1000', function() {
        var result = stopclock.parsePrettyTime(time).deltaSeconds,
            delta = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(1800); // delta/1000
    });
});


describe('parsePrettyTime() with hours only (3h)', function() {
    var stopclock = new StopClock(),
        time = '3h';

    it('hours should be 3', function() {
        var result = stopclock.parsePrettyTime(time).hours;
        expect(result).toBe(3);
    });

    it('minutes should be 0', function() {
        var result = stopclock.parsePrettyTime(time).minutes;
        expect(result).toBe(0);
    });

    it('seconds should be 0', function() {
        var result = stopclock.parsePrettyTime(time).seconds;
        expect(result).toBe(0);
    });

    it('delta should be ', function() {
        var result = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(10800000); // 3*60*60*1000
    });

    it('deltaSeconds should be equal delta/1000', function() {
        var result = stopclock.parsePrettyTime(time).deltaSeconds,
            delta = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(10800); // delta/1000
    });
});

describe('parsePrettyTime() with minutes and seconds (30m30s)', function() {
    var stopclock = new StopClock(),
        time = '30m30s';

    it('hours should be 0', function() {
        var result = stopclock.parsePrettyTime(time).hours;
        expect(result).toBe(0);
    });

    it('minutes should be 30', function() {
        var result = stopclock.parsePrettyTime(time).minutes;
        expect(result).toBe(30);
    });

    it('seconds should be 30', function() {
        var result = stopclock.parsePrettyTime(time).seconds;
        expect(result).toBe(30);
    });

    it('delta should be ', function() {
        var result = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(1830000); // (30*60*1000) + (30*1000)
    });

    it('deltaSeconds should be equal delta/1000', function() {
        var result = stopclock.parsePrettyTime(time).deltaSeconds,
            delta = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(1830); // delta/1000
    });
});

describe('parsePrettyTime() with hours, minutes and seconds (3h30m30s)', function() {
    var stopclock = new StopClock(),
        time = '3h30m30s';

    it('hours should be 3', function() {
        var result = stopclock.parsePrettyTime(time).hours;
        expect(result).toBe(3);
    });

    it('minutes should be 30', function() {
        var result = stopclock.parsePrettyTime(time).minutes;
        expect(result).toBe(30);
    });

    it('seconds should be 30', function() {
        var result = stopclock.parsePrettyTime(time).seconds;
        expect(result).toBe(30);
    });

    it('delta should be ', function() {
        var result = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(12630000); // (3*60*60*1000)+(30*60*1000)+(30*1000)
    });

    it('deltaSeconds should be equal delta/1000', function() {
        var result = stopclock.parsePrettyTime(time).deltaSeconds,
            delta = stopclock.parsePrettyTime(time).delta;
        expect(result).toBe(12630); // delta/1000
    });
});