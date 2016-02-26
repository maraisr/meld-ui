var Meld = Meld.Meld;

describe('Creation', function () {

    var context = document.createElement('div');
    context.setAttribute('id', 'app');

    it('warn\'s when no HTMLElement is given', function () {
        console.warn = jasmine.createSpy('warn');

        new Meld.Ui();

        expect(console.warn).toHaveBeenCalled();
    });
});
