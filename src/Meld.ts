import {Render as r} from 'Render';
import {Common} from 'helpers/Common';

export module Meld {
    export class Ui {
		public elm: HTMLElement;

        constructor(elm: HTMLElement, binds?: any) {
			if (!elm) {
				console.warn('Meld: No HTMLElement provided.');
			}

			this.elm = elm;

			if (binds != void 0) {
				this.render(binds);
			}
        }

		// TODO: Add a function for config, so that each object key can get a "style, or width properties"
		// TODO: Cleanup render function, and refactor to deligate
		// TODO: Move all DOM augments to an engine of somesort, so that we canship to virtual DOM down the tack
		// TODO: Make this whole bloody thing work! #YOLO

		render(binds: any): Boolean {

			var _r = new r.Rndr(Common.hasher());

			Object.keys(binds).forEach((key) => {
				let val = binds[key];

				// TODO: This whole section could be done in a recursive manner
				switch (typeof val) {
					case 'object':

						// TODO: Check to see if callable, and if so call
						let grp = _r.group(key);

						Object.keys(val).forEach((grpKey) => {
							let grpVal = val[grpKey];

							grp.add(new r.Text(grpKey, grpVal));
						});

						break;
					case 'string':
						_r.add(new r.Text(key, val));
						break;
				}

			});

			this.elm.appendChild(_r.render());

			return true;
		}
    }
}
