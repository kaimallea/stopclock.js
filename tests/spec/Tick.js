describe('tick()', function() {
    var stopclock;

    var simulateTicks = function(n) {
        while(n > 0) {
            stopclock.tick();
            --n;
        }
    };

    describe('normal tick', function() {

        beforeEach(function() {
            stopclock = new StopClock();
        });

        afterEach(function() {
            stopclock = null;
        });

        it('should tick to 00:00:30', function() {
            simulateTicks(30);
            expect( stopclock.toString() ).toBe('00:00:30');
        });

        it('should tick to 00:30:00', function() {
            simulateTicks(30*60);
            expect( stopclock.toString() ).toBe('00:30:00');
        });

        it('should tick to 03:00:00', function() {
            simulateTicks(3*60*60);
            expect( stopclock.toString() ).toBe('03:00:00');
        });
    });


    describe('reverse tick (countdown)', function() {

        beforeEach(function() {
            stopclock = new StopClock({ countDown: true });
            stopclock.set('3h');
        });

        afterEach(function() {
            stopclock = null;
        });

        it('should tick down to 02:59:30', function() {
            simulateTicks(30);
            expect( stopclock.toString() ).toBe('02:59:30');
        });


        it('should tick down to 02:00:00', function() {
            simulateTicks(60*60);
            expect( stopclock.toString() ).toBe('02:00:00');
        });

        it('should tick down to 00:00:00', function() {
            simulateTicks(3*60*60);
            expect( stopclock.toString() ).toBe('00:00:00');
        });

    });

});