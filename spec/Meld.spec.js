var Meld = Meld.Meld;

describe('Creation', function () {

    var context = document.createElement('div');
    context.setAttribute('id', 'app');

	afterEach(function () {
		context.innerHTML = '';
	});

    it('warn\'s when no HTMLElement is given', function () {
        console.warn = jasmine.createSpy('warn');

        new Meld.Ui();

        expect(console.warn).toHaveBeenCalled();
    });

	it('renders 3 text inputs', function () {
		var m = new Meld.Ui(context);

		m.render({
			'name': 'Leanne Graham',
			'email': 'Sincere@april.biz',
			'website': 'hildegard.org'
		});

		expect(context.getElementsByClassName('meld__bind--text').length == 3).toEqual(true);
	});
});
