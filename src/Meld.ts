import {Render as r} from 'Render';
import {Common, UiStructure} from 'helpers/Common';
import {Config} from 'helpers/Config';

export module Meld {
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

		private findStructure(which: string, search: string): UiStructure {
			let structure = this.struct.filter((v: UiStructure) => {
				return v[which] == search;
			}),
				sendStruct: UiStructure,
				found: Boolean = false;

			if (structure.length == 1) {
				found = true;
				sendStruct = {
					display: structure[0].display || search,
					class: structure[0].class || void 0
				}
			} else {
				sendStruct = {
					display: search
				}
			}

			switch (which) {
				case 'group':
				case 'field':
					var tmp = this.struct.filter((v: UiStructure) => {
						return v[which] == '*';
					});

					if (tmp.length > 0) {
						if (sendStruct.class == void 0) {
							sendStruct.class = tmp[0].class || void 0;
						}
					}
					break;
			}

			sendStruct.inputClass = ((): string => {
				var tmp = this.struct.filter((v: UiStructure) => {
					return v.input == '*';
				});

				if (tmp.length > 0) {
					return tmp[0].class || void 0;
				}

				return void 0;
			})();

			return sendStruct;
		}

		// TODO: Move all DOM augments to an engine of somesort, so that we canship to virtual DOM down the tack

		private build(binds: any): Array<any> {
			var returns = [];

			Object.keys(binds).forEach((key) => {
				let val = binds[key];

				switch (typeof val) {
					case 'object':
						var grp = new r.Group(this.findStructure('group', key));
						grp.set(this.build(val));
						returns.push(grp);
						break;

					case 'string':
						returns.push(new r.Text(this.findStructure('field', key), val));
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
