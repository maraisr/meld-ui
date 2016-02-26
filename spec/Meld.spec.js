var Meld = Meld.Meld;

describe('Testing the creation of a meld view', function () {

	var context = document.createElement('div');
		context.setAttribute('id', 'app');

	it('Creates a DOM node', function() {
		document.body.appendChild(context);

		var m = new Meld.Ui(context, {
			selectTemplate: '<select></select>'
		});

		expect(context.getElementsByTagName('select').length > 0).toBe(true);
	});
});
