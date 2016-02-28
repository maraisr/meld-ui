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


	describe('renders', function () {

		it('3 text inputs', function () {
			new Meld.Ui(context, {
				'name': 'Leanne Graham',
				'email': 'Sincere@april.biz',
				'website': 'hildegard.org'
			});

			expect(context.getElementsByTagName('input').length == 3).toEqual(true);
		});

		it('is wrapped in a form tag', function () {
			new Meld.Ui(context, {
				'name': 'Leanne Graham',
				'email': 'Sincere@april.biz',
				'website': 'hildegard.org'
			});

			expect(context.getElementsByTagName('form').length == 1).toEqual(true);
		});

		it('groups bindinds', function () {
			new Meld.Ui(context, {
				'name': 'Leanne Graham',
				'email': 'Sincere@april.biz',
				'website': 'hildegard.org',
				'address': {
					'street': 'Kulas Light',
					'suite': 'Apt. 556',
					'city': 'Gwenborough',
					'zipcode': '92998-3874'
				}
			});

			expect(context.getElementsByTagName('legend')[0].innerText == 'address').toEqual(true);
		});
	});

});
