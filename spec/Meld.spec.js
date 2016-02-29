var Meld = Meld.Meld;

describe('Creation', function () {

	var context = document.createElement('div');
	context.setAttribute('id', 'app');

	var mockPayload = {
		'name': 'Leanne Graham',
		'email': 'Sincere@april.biz',
		'website': 'hildegard.org',
		'address': {
			'street': 'Kulas Light',
			'suite': 'Apt. 556',
			'city': 'Gwenborough',
			'zipcode': '92998-3874'
		}
	};

	afterEach(function () {
		context.innerHTML = '';
	});

	beforeEach(function () {
		document.body.appendChild(context);
	});

	it('throw when no binds', function () {
		var m = new Meld.Ui();

		expect(function () {
			m.render()
		}).to.throw();
	});


	describe('renders', function () {

		it('3 text inputs', function () {
			var m = new Meld.Ui({
				'name': 'Leanne Graham',
				'email': 'Sincere@april.biz',
				'website': 'hildegard.org'
			});

			m.render(context);

			expect(context.getElementsByTagName('input').length == 3).to.be.true;
		});

		it('is wrapped in a form tag', function () {
			var m = new Meld.Ui(mockPayload);

			m.render(context);

			expect(context.getElementsByTagName('form').length == 1).to.be.true;
		});

		it('groups binding\'s', function () {
			var m = new Meld.Ui(mockPayload);

			m.render(context);

			expect(context.getElementsByTagName('legend')[0].innerText == 'address').to.be.true;
		});

		it('destories', function () {
			var m = new Meld.Ui(mockPayload);

			m.render(context);

			m.destory();

			expect(document.getElementById('app')).to.be.null;
		});

	});

});
