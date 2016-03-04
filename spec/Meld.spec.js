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
		expect(function () {
			new Meld.Ui()
		}).to.throw();
	});

	it('destroy\'s', function () {
		var m = new Meld.Ui({
			elm: '#app',
			binds: mockPayload
		});

		m.destory();

		expect(document.getElementById('app')).to.be.null;
	});

	it('destory\'s no elemet', function () {
		expect(function () {
			var m = new Meld.Ui({
				elm: '#app1'
			});
			m.destory();
		}).to.throw();
	});

	it('no bind values', function () {
		expect(function () {
			new Meld.Ui({
				elm: '#app'
			});
		}).to.throw();
	});

	it('no elm', function () {
		expect(function () {
			new Meld.Ui({
				binds: mockPayload
			});
		}).to.throw();
	});

	describe('renders', function () {

		it('3 text inputs', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'name': 'Leanne Graham',
					'email': 'Sincere@april.biz',
					'website': 'hildegard.org'
				}
			});

			expect(context.getElementsByTagName('input').length == 3).to.be.true;
		});

		it('number input', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'age': 17
				}
			});

			expect(context.getElementsByTagName('input')[0].type).to.equal('number');
		});

		it('defaults falsey values to blank', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'a': void 0,
					'b': null
				}
			});

			expect([context.getElementsByTagName('input')[1].value, context.getElementsByTagName('input')[1].value]).to.deep.equal(['', '']);
		});

		it('a checkbox', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'test': true
				}
			});

			expect(context.getElementsByTagName('input')[0].type).to.equal('checkbox');
		});

		it('a textarea', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'blob': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate dolorem ex fugiat ipsa, iure maxime nihil nobis possimus quas, saepe sed tempora voluptatum. A cumque dignissimos tempora voluptate voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate dolorem ex fugiat ipsa, iure maxime nihil nobis possimus quas, saepe sed tempora voluptatum. A cumque dignissimos tempora voluptate voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate dolorem ex fugiat ipsa, iure maxime nihil nobis possimus quas, saepe sed tempora voluptatum. A cumque dignissimos tempora voluptate voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate dolorem ex fugiat ipsa, iure maxime nihil nobis possimus quas, saepe sed tempora voluptatum. A cumque dignissimos tempora voluptate voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate dolorem ex fugiat ipsa, iure maxime nihil nobis possimus quas, saepe sed tempora voluptatum. A cumque dignissimos tempora voluptate voluptates.'
				}
			});

			expect(context.getElementsByTagName('textarea')).to.have.length(1);
		});

		it('is wrapped in a form tag', function () {
			new Meld.Ui({
				elm: '#app',
				binds: mockPayload
			});

			expect(context.getElementsByTagName('form')).to.have.length(1);
		});

		it('group binding\'s', function () {
			new Meld.Ui({
				elm: '#app',
				binds: mockPayload
			});

			expect(context.getElementsByTagName('legend')[0].innerText == 'Address').to.be.true;
		});

		it('group css class', function () {
			new Meld.Ui({
				elm: '#app',
				structure: [
					{
						group: 'address',
						display: 'Address',
						class: 'form-group'
					}
				],
				binds: mockPayload
			});

			expect(context.getElementsByClassName('form-group')).to.have.length(1);
		});

		it('title case', function () {
			new Meld.Ui({
				elm: '#app',
				binds: {
					'test test': 'test'
				}
			});

			expect(context.getElementsByTagName('input')[0].placeholder).to.equal('Test Test');
		});

		describe('wildecard classes', function () {
			it('on fields', function () {
				new Meld.Ui({
					elm: '#app',
					structure: [
						{
							field: '*',
							class: 'form-group'
						}
					],
					binds: mockPayload
				});

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
				new Meld.Ui({
					elm: '#app',
					structure: [
						{
							group: '*',
							class: 'form-group'
						}
					],
					binds: mockPayload
				});

				expect((function () {
					var classes = [],
						inputs = context.getElementsByTagName('fieldset');

					for (var i = 0; i < inputs.length; i++) {
						classes.push(inputs[i].className);
					}

					return classes;
				})()).to.deep.equal(['form-group']);
			});

			it('on inputs', function () {
				new Meld.Ui({
					elm: '#app',
					structure: [
						{
							input: '*',
							class: 'form-control'
						}
					],
					binds: mockPayload
				});

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

		it('updates the ui', function(done) {
			var m = new Meld.Ui({
				elm: '#app',
				binds: {
					'firstname': 'Marais'
				}
			});

			context.getElementsByTagName('input')[0].value = 'test';

			setTimeout(function(v) {
				expect(m.binds.firstname).to.equal('test');
				done();
			}, 100);
		});

	});

});
