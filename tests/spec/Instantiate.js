describe('StopClock Instantiation', function() {
    var stopclock = new StopClock();

    it('should stringify to 00:00:00', function() {
        var result = stopclock.toString();
        expect(result).toBe('00:00:00');
    });

    it('isRunning() should be false', function() {
        var result = stopclock.isRunning();
        expect(result).toBe(false);
    });
});