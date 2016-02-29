import {Render as r} from 'Render';
import {Common} from 'helpers/Common';

export module Meld {
	const __CHILDREN: string = '__children__';

	interface UiStructure {
		field?: string;
		display?: string;
		group?: string;
		class?: string;
	}

    export class Ui {
		public elm: HTMLElement;
		public struct: Array<UiStructure> = new Array();

		private fields: Array<any> = new Array();
		private binds: any;

        constructor(binds: any) {
			if (binds != void 0) {
				this.binds = binds;
			}

			return this;
        }

		// TODO: Move all DOM augments to an engine of somesort, so that we canship to virtual DOM down the tack

		private build(binds: any): Array<any> {
			var returns = [];

			Object.keys(binds).forEach((key) => {
				let val = binds[key];

				switch (typeof val) {
					case 'object':

						let structure = this.struct.filter((v: UiStructure) => {
							return v.group == key;
						}),
							name = key;

						if (structure.length > 0) {
							name = structure[0].display || key;
						}

						var grp = new r.Group(name);
						grp.set(this.build(val));
						returns.push(grp);
						break;

					case 'string':
						returns.push(new r.Text(key, val));
						break;
				}
			});

			return returns;
		}

		render(elm: HTMLElement): HTMLElement {
			if (!elm) {
				throw new Error('Meld: No HTMLElement provided.');
			}

			this.elm = elm;

			if (this.binds == void 0) {
				throw new Error('Meld: Empty bind values, nothing to render');
			}

			let _r = new r.Rndr(Common.hasher());
			this.elm.appendChild(_r.render(this.build(this.binds)));

			return this.elm;
		}

		// TODO: Add a function for config, so that each object key can get a "style, or width properties"
		structure(config: Array<UiStructure>): Ui {
			this.struct = config;
			return this;
		}

		destory(): Boolean {
			if (this.elm.parentNode) {
				this.elm.parentNode.removeChild(this.elm);

				return true;
			} else {
				console.warn('Meld: There was no element to cull.');
			}

			return false;
		}
    }
}
