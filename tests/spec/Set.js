describe('set()', function() {
    var stopclock = StopClock.init();

    it('should be 00:30:00', function() {
        expect( stopclock.set('30m').toString() ).toBe('00:30:00');
    });

    it('should be 03:30:00', function() {
        var result = stopclock.toString();
        expect( stopclock.set('3h30m').toString() ).toBe('03:30:00');
    });

    it('should be 03:30:33', function() {
        var result = stopclock.toString();
        expect( stopclock.set('3h30m33s').toString() ).toBe('03:30:33');
    });
});