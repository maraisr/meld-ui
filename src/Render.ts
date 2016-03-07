import {Common} from './helpers/Common';
import {UiStructure} from './helpers/Structure';

export module Render {
	export class Rndr {
		public name: string;

		private elm: HTMLElement;
		private fields: Array<any>;

		private orig: any;

		constructor(name: string) {
			this.name = name;

			this.elm = document.createElement('form');
			this.elm.setAttribute('id', name);
		}

		render(fields: Array<any>, orig: any): HTMLElement {
			this.orig = orig;
			this.fields = fields;
			this.fields.forEach((v) => {
				this.elm.appendChild(v.deligate());
			});

			requestAnimationFrame(() => this.loop());

			return this.elm;
		}

		private loop() {
			this.fields.forEach((v: Bind) => {
				if (v.struct) {
					this.orig[v.struct.field] = v.result;
				}
			});

			requestAnimationFrame(() => this.loop());
		}
	}

	export class Group {
		private elm: HTMLElement;

		private fields: Array<any> = new Array();

		constructor(struct: UiStructure) {
			let grp = document.createElement('fieldset'),
				lgnd = document.createElement('legend');

			lgnd.innerText = struct.display;

			if (struct.class) {
				grp.className = struct.class;
			}

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
		public struct: UiStructure;
		public hash: string;

		public elm: HTMLElement;

		public value: any;

		public innerElm: any;

		constructor(struct: UiStructure, value: any) {
			this.struct = struct;
			this.value = value;

			this.hash = Common.hasher();

			this.elm = document.createElement('div');

			if (struct.class) {
				this.elm.className = struct.class;
			}
		}

		generateInput(): HTMLElement {
			let elm = document.createElement('input');

			elm.setAttribute('id', this.hash);
			elm.setAttribute('name', this.hash);
			elm.setAttribute('value', this.value);

			elm.setAttribute('placeholder', this.struct.display);

			if (this.struct.inputClass) {
				elm.className = this.struct.inputClass;
			}

			return elm;
		}

		generateLabel(): HTMLElement {
			let elm = document.createElement('label');

			elm.setAttribute('for', this.hash);
			elm.innerText = this.struct.display;

			return elm;
		}

		get result() {
			return this.innerElm.value;
		}
	}

	export class Text extends Bind {
		deligate(): HTMLElement {
			let elm = this.generateInput();
			elm.setAttribute('type', 'text');

			this.elm.appendChild(this.generateLabel());
			this.elm.appendChild(elm);

			this.innerElm = elm;

			return this.elm;
		}
	}

	export class TextArea extends Bind {
		deligate(): HTMLElement {
			let elm = document.createElement('textarea');

			elm.setAttribute('id', this.hash);
			elm.setAttribute('name', this.hash);

			elm.setAttribute('placeholder', this.struct.display);

			if (this.struct.inputClass) {
				elm.className = this.struct.inputClass;
			}

			elm.innerText = this.value;

			this.elm.appendChild(this.generateLabel());
			this.elm.appendChild(elm);

			this.innerElm = elm;

			return this.elm;
		}
	}

	export class Number extends Bind {
		deligate(): HTMLElement {
			let elm = this.generateInput();
			elm.setAttribute('type', 'number');

			this.elm.appendChild(this.generateLabel());
			this.elm.appendChild(elm);

			this.innerElm = elm;

			return this.elm;
		}
	}

	export class Binary extends Bind {
		deligate(): HTMLElement {
			let elm = this.generateInput();
			elm.setAttribute('type', 'checkbox');
			elm.removeAttribute('value');
			elm.removeAttribute('placeholder');

			if (this.value === true) {
				elm.setAttribute('checked', 'checked');
			}

			let lbl = this.generateLabel();
			lbl.insertBefore(elm, lbl.firstChild);

			this.elm.appendChild(lbl);

			this.innerElm = elm;

			return this.elm;
		}
	}
}
