import {Common, UiStructure} from 'helpers/Common';

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

		constructor(struct:UiStructure) {
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
		public struct:UiStructure;
		public hash: string;

		public elm: HTMLElement;

		public value:any;

		constructor(struct:UiStructure, value:any) {
			this.struct = struct;
			this.value = value;

			this.hash = Common.hasher();

			this.elm = document.createElement('div');

			if (struct.class) {
				this.elm.className = struct.class;
			}
		}
	}

	export class Text extends Bind {
		deligate(): HTMLElement {

			let elm = document.createElement('input');
			this.elm.appendChild(elm);

			elm.setAttribute('type', 'text');

			elm.setAttribute('name', this.hash);
			elm.setAttribute('value', this.value);

			if (this.struct.inputClass) {
				elm.className = this.struct.inputClass;
			}

			return this.elm;
		}
	}
}
