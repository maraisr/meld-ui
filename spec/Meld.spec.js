var Meld = Meld.Meld;

describe('Testing the creation of a meld view', function () {
    it('Creates a new Meld instance', function () {
        var m = new Meld.Ui();
       
        expect(m instanceof Meld.Ui).toBe(true);
    });
});