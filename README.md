MELD UI [![NPM version](https://img.shields.io/npm/v/meld-ui.svg?style=flat-square)](https://www.npmjs.com/package/meld-ui) [![Bower version](https://img.shields.io/bower/v/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui) [![Travis](https://img.shields.io/travis/maraisr/meld-ui.svg?style=flat-square)](https://travis-ci.org/maraisr/meld-ui) [![License](https://img.shields.io/npm/l/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui/blob/master/LICENSE.md)
=======

> The beginings of something great!

I aim to create a lightweight framework per say that is unobtrusive, or agnostic of its surroundings. So in essence being able to communicate with Angular, React, Web Components or the old school Vanilla JS. Giving you the wonders of a dynamic OIM (Object Interface Mapper) filling the gap between an ORM and the UI.

## Installation
Install Meld UI using [npm](https://docs.npmjs.com/):
```sh
npm i meld-ui --save
```

Install Meld UI using [bower](http://bower.io/#getting-started):
```sh
bower i meld-ui --save
```

## Basic Usuage
Down the line this'll all be configurable, in terms of rendering, display names, with labels, with validation and all that jaz.

```JavaScript
var context = document.createElement('div');

(new Meld.Ui({
	'name': 'Leanne Graham',
	'email': 'Sincere@april.biz',
	'website': 'hildegard.org',
	'address': {
		'street': 'Kulas Light',
		'suite': 'Apt. 556',
		'city': 'Gwenborough',
		'zipcode': '92998-3874'
	}
})).render(context);

```
Will produce:
```HTML
<div>
	<form id="lzp0xpx" name="lzp0xpx">
		<div>
			<input name="vnax26h" type="text" value="Leanne Graham">
		</div>
		<div>
			<input name="kkdsitb" type="text" value="Sincere@april.biz">
		</div>
		<div>
			<input name="l4mawmi" type="text" value="hildegard.org">
		</div>
		<fieldset>
			<legend>address</legend>
			<div>
				<input name="hif0vf3" type="text" value="Kulas Light">
			</div>
			<div>
				<input name="x6cisd5" type="text" value="Apt. 556">
			</div>
			<div>
				<input name="mhawvem" type="text" value="Gwenborough">
			</div>
			<div>
				<input name="chxmnod" type="text" value="92998-3874">
			</div>
		</fieldset>
	</form>
</div>
```

## Building
- `npm i -g tsc`
- `npm i`
- `npm run watch:dev`

## Testing
- `npm i`
- `npm test`

For a release `npm run build`.
