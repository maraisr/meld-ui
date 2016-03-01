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

	it('destroy\'s', function () {
		var m = new Meld.Ui(mockPayload);

		m.render(context);

		m.destory();

		expect(document.getElementById('app')).to.be.null;
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

		it('group binding\'s', function () {
			var m = new Meld.Ui(mockPayload);

			m.render(context);

			expect(context.getElementsByTagName('legend')[0].innerText == 'Address').to.be.true;
		});

		it('group css class', function () {
			var m = new Meld.Ui(mockPayload);

			m.structure([
				{
					group: 'address',
					display: 'Address',
					class: 'form-group'
				}
			]);

			m.render(context);

			expect(context.getElementsByClassName('form-group')).to.have.length(1);
		});

		describe('wildecard classes', function () {
			it('on fields', function () {
				var m = new Meld.Ui(mockPayload);

				m.structure([
					{
						field: '*',
						class: 'form-group'
					}
				]);

				m.render(context);

				expect((function () {
					var classes = [],
						inputs = context.getElementsByTagName('input');

					for (var i = 0; i < inputs.length; i++) {
						classes.push(inputs[i].parentElement.className);
					}

					return classes;
				})()).to.deep.equal(['form-group', 'form-group', 'form-group', 'form-group', 'form-group', 'form-group', 'form-group']);
			});

			it('on groups', function () {
				var m = new Meld.Ui(mockPayload);

				m.structure([
					{
						group: '*',
						class: 'form-group'
					}
				]);

				m.render(context);

				expect((function () {
					var classes = [],
						inputs = context.getElementsByTagName('fieldset');

					for (var i = 0; i < inputs.length; i++) {
						classes.push(inputs[i].className);
					}

					return classes;
				})()).to.deep.equal(['form-group']);
			});

			it('on inputs', function() {
				var m = new Meld.Ui(mockPayload);

				m.structure([
					{
						input: '*',
						class: 'form-control'
					}
				]);

				m.render(context);

				expect((function () {
					var classes = [],
						inputs = context.getElementsByTagName('input');

					for (var i = 0; i < inputs.length; i++) {
						classes.push(inputs[i].className);
					}

					return classes;
				})()).to.deep.equal(['form-control', 'form-control', 'form-control', 'form-control', 'form-control', 'form-control', 'form-control']);
			});
		});

		it('title case', function() {
			var m = new Meld.Ui({
				'test test': 'test'
			});
			m.render(context);

			expect(context.getElementsByTagName('input')[0].placeholder).to.equal('Test Test');
		});
	});

});
