export module Render {
	class Bind {
		public name: string;
		public value: string;
		public hash: string;

		public elm: HTMLElement;

		constructor(name: string, value: any) {
			this.name = name;
			this.value = value;

			this.hash = Math.random().toString(36).substr(2, 7);

			this.elm = document.createElement('div');
			this.elm.className = 'meld__bind';
		}
	}

	export class Text extends Bind {
		public deligate(): HTMLElement {

			let elm = document.createElement('input');
			this.elm.appendChild(elm);

			elm.setAttribute('type', 'text');

			elm.setAttribute('name', this.hash);
			elm.setAttribute('value', this.value);

			return this.elm;
		}
	}
}
