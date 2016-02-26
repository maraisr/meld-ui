export module Render {
	class Bind {
		public name: string;
		public value: string;

		constructor(name: string, value: any) {
			this.name = name;
			this.value = value;
		}
	}

	export class Text extends Bind {
		public deligate(): HTMLElement {
			let elm = document.createElement('input');
			elm.setAttribute('type', 'text');

			elm.setAttribute('name', this.name);
			elm.setAttribute('value', this.value);

			return elm;
		}
	}
}
