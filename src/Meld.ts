import {Render as r} from './Render';
import {Common, UiStandard} from './helpers/Common';

import {Structure, UiStructure} from './helpers/Structure';

let uid = 0;

export module Meld {
    export class Ui {
		public elm: HTMLElement;
		public struct: Structure;

		private fields: Array<any> = new Array();
		public binds: any;

		private _uid: number;
		private _isMeld: Boolean;

        constructor(config: UiStandard) {
			this.binds = config.binds;
			this.struct = new Structure(config.structure || []);

			this._uid = uid++;
			this._isMeld = true;

			this.elm = <HTMLElement>document.body.querySelector(config.elm);

			this.render();

			return this;
        }

		// TODO: Move all DOM augments to an engine of somesort, so that we canship to virtual DOM down the tack
		private build(binds: any): Array<any> {
			var returns = [];

			Object.keys(binds).forEach((key) => {
				let val = binds[key],
					pusher: any;

				if (val == void 0 || val == null) {
					val = '';
				}

				switch (typeof val) {
					case 'object':
						var struct = this.struct.findStructure('group', key);
						struct.field = key;

						if (!struct.hide) {
							var grp = new r.Group(struct);
							grp.set(this.build(val));
							pusher = grp;
						}

						break;
					case 'number':
					case 'string':
					case 'boolean':
						var struct = this.struct.findStructure('field', key);
						struct.field = key;

						if (!struct.hide) {
							switch (typeof val) {
								case 'string':
									if (val.length > 155) {
										pusher = new r.TextArea(struct, val);
									} else {
										pusher = new r.Text(struct, val);
									}

									break;
								case 'number':
									pusher = new r.Number(struct, val);
									break;
								case 'boolean':
									struct.inputClass = void 0;
									pusher = new r.Binary(struct, val);
									break;
							}
						}

						break;
				}

				if (pusher) {
					returns.push(pusher);
				}
			});

			return returns;
		}

		private render(): HTMLElement {
			if (this.elm == void 0) {
				throw new ReferenceError('Meld: No HTMLElement provided.');
			}

			if (this.binds == void 0) {
				throw new ReferenceError('Meld: Empty bind values, nothing to render');
			}

			let _r = new r.Rndr(Common.hasher());
			this.elm.appendChild(_r.render(this.build(this.binds), this.binds));

			return this.elm;
		}

		destory(): Boolean {
			if (this.elm) {
				this.elm.parentNode.removeChild(this.elm);

				return true;
			} else {
				throw new ReferenceError('Meld: There was no element to cull.');
			}
		}
    }
}
