var Meld = Meld.Meld;

describe('Creation', function () {

	var context = document.createElement('div');
		context.setAttribute('id', 'app');

	it('inits', function() {
		document.body.appendChild(context);

		var m = new Meld.Ui(context);

		m.render();

		expect(true).toBe(true);
	});

});
