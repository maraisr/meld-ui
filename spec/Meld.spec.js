var Meld = Meld.Meld;

describe('Creation', function () {

    var context = document.createElement('div');
    context.setAttribute('id', 'app');

    it('warn\'s when no HTMLElement is given', function () {
        console.warn = jasmine.createSpy('warn');

        new Meld.Ui();

        expect(console.warn).toHaveBeenCalled();
    });

    it('created the correct two dom nodes!', function () {
        var m = new Meld.Ui(context);

        m.render({
			firstname: 'Marais',
			lastname: 'Rossouw'
		});

		expect(context.innerHTML).toEqual('<input type="text" name="firstname" value="Marais"><input type="text" name="lastname" value="Rossouw">');
    });

});
