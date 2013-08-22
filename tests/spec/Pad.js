describe('pad()', function() {
    var stopclock = StopClock.init();


    describe('pad() using numbers', function() {
        it('should return "00"', function() {
            var result = stopclock.pad(0);
            expect(result).toBe('00');
        });

        it('should return "03"', function() {
            var result = stopclock.pad(3);
            expect(result).toBe('03');
        });

        it('should return "33"', function() {
            var result = stopclock.pad(33);
            expect(result).toBe('33');
        });
    });

    describe('pad() using strings', function() {
        it('should return "00"', function() {
            var result = stopclock.pad('0');
            expect(result).toBe('00');
        });

        it('should return "03"', function() {
            var result = stopclock.pad('3');
            expect(result).toBe('03');
        });

        it('should return "33"', function() {
            var result = stopclock.pad('33');
            expect(result).toBe('33');
        });
    });

});