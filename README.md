MELD UI
=======

[![NPM version](https://img.shields.io/npm/v/meld-ui.svg?style=flat-square)](https://www.npmjs.com/package/meld-ui)
[![Bower version](https://img.shields.io/bower/v/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui)
[![Travis](https://img.shields.io/travis/maraisr/meld-ui.svg?style=flat-square)](https://travis-ci.org/maraisr/meld-ui)
[![Codecov](https://img.shields.io/codecov/c/github/maraisr/meld-ui.svg?style=flat-square)](https://codecov.io/github/maraisr/meld-ui)
[![License](https://img.shields.io/npm/l/meld-ui.svg?style=flat-square)](https://github.com/maraisr/meld-ui/blob/master/LICENSE.md)

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

## Basic Usage
Down the line this'll all be configurable, in terms of rendering, display names, with labels, with validation and all that jaz.

```JavaScript
var m = new Meld.Ui({
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
});

m.render(document.getElementById('app'));
```

## Building
- `npm i -g typescript`
- `npm i`
- `npm run watch:dev`

## Testing
- `npm i`
- `npm test`

For a release `npm run build`.
