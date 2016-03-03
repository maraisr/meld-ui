MELD UI
=======

[![NPM version](https://img.shields.io/npm/v/meld-ui.svg?style=flat-square)](https://www.npmjs.com/package/meld-ui)
[![Bower version](https://img.shields.io/bower/v/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui)
[![Travis](https://img.shields.io/travis/maraisr/meld-ui.svg?style=flat-square)](https://travis-ci.org/maraisr/meld-ui)
[![Codecov](https://img.shields.io/codecov/c/github/maraisr/meld-ui.svg?style=flat-square)](https://codecov.io/github/maraisr/meld-ui)
[![License](https://img.shields.io/npm/l/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui/blob/master/LICENSE.md)

## Intro
Meld Ui is a small lightweight library per say, aiding in a flexable unobtrusive take on JavaScript plain objects that renders a form, with a simple API. If you're familiar with OIM's... this is one.

## Installation
Install Meld UI using [npm](https://docs.npmjs.com/):
```sh
npm i meld-ui --save
```

Install Meld UI using [bower](http://bower.io/#getting-started):
```sh
bower i meld-ui --save
```

## Example Usage
```JavaScript
(new Meld.Ui({
	name: 'Leanne Graham',
	details: {
		email: 'Sincere@april.biz',
		website: 'hildegard.org',
	},
	address: {
		street: 'Kulas Light',
		suite: 'Apt. 556',
		city: 'Gwenborough',
		zipcode: '92998-3874'
	}
})).render(document.getElementById('app'));
```

## Building
- `npm i -g typescript`
- `npm i`
- `npm run watch:dev`

## Testing
- `npm i`
- `npm test`

For a release `npm run build`.

## License
[GPL-2.0](https://github.com/maraisr/meld-ui/blob/master/LICENSE.md)

Copyright(c) 2016 Marais Rossouw
