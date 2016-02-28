import {Render as r} from 'Render';
import {Common} from 'helpers/Common';

export module Meld {
	const __CHILDREN: string = '__children__';

    export class Ui {
		public elm: HTMLElement;

		private fields: Array<any> = new Array();

		private built: Array<any> = new Array();

        constructor(binds: any) {
			if (binds != void 0) {
				this.built = this.build(binds);
			}

			return this;
        }

		// TODO: Add a function for config, so that each object key can get a "style, or width properties"
		// TODO: Move all DOM augments to an engine of somesort, so that we canship to virtual DOM down the tack
		// TODO: Make this whole bloody thing work! #YOLO

		private build(binds: any): Array<any> {
			var returns = [];

			Object.keys(binds).forEach((key) => {
				let val = binds[key];

				switch (typeof val) {
					case 'object':
						var grp = new r.Group(key);
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

		render(elm:HTMLElement): HTMLElement {
			if (!elm) {
				throw new Error('Meld: No HTMLElement provided.');
			}

			this.elm = elm;

			if (this.built.length <1) {
				throw new Error('Meld: Empty bind values, nothing to render');
			}

			let _r = new r.Rndr(Common.hasher());
			this.elm.appendChild(_r.render(this.built));

			return this.elm;
		}
    }
}
