import {Common} from 'helpers/Common';

export module Render {
	export class Rndr {
		public name: string;

		private elm: HTMLElement;

		constructor(name: string) {
			this.name = name;

			this.elm = document.createElement('form');
			this.elm.setAttribute('id', name);
		}

		render(fields:Array<any>): HTMLElement {
			fields.forEach((v) => {
				this.elm.appendChild(v.deligate());
			});

			return this.elm;
		}
	}

	export class Group {
		private elm: HTMLElement;

		private fields: Array<any> = new Array();

		constructor(name: string) {
			let grp = document.createElement('fieldset'),
				lgnd = document.createElement('legend');

			lgnd.innerText = name;

			grp.appendChild(lgnd);

			this.elm = grp;
		}

		set(fields: Array<any>): Boolean {
			this.fields = fields;

			return true;
		}

		deligate(): HTMLElement {
			this.fields.forEach((v) => {
				this.elm.appendChild(v.deligate());
			});

			return this.elm;
		}
	}

	class Bind {
		public name: string;
		public value: string;
		public hash: string;

		public elm: HTMLElement;

		constructor(name: string, value: any) {
			this.name = name;
			this.value = value;

			this.hash = Common.hasher();

			this.elm = document.createElement('div');
		}
	}

	export class Text extends Bind {
		deligate(): HTMLElement {

			let elm = document.createElement('input');
			this.elm.appendChild(elm);

			elm.setAttribute('type', 'text');

			elm.setAttribute('name', this.hash);
			elm.setAttribute('value', this.value);

			return this.elm;
		}
	}
}
