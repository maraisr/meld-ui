import {Elements as e} from 'Elements';
import {Render as r} from 'Render';

export module Meld {
	interface UiTemplates {
		input: string;
	}

	interface UiConfig {
		templates: UiTemplates;
	}

    export class Ui {
		public elm: HTMLElement;
		private config: UiConfig;

		public fields: Array<r.Text> = new Array();

        constructor(elm: HTMLElement) {
			if (!elm) {
				console.warn('Meld: No HTMLElement provided.');
			}

			this.elm = elm;
        }

		public init(config: UiConfig): Boolean {
			this.config = config;

			return true;
		}

		public render(binds: any): Boolean {

			Object.keys(binds).forEach((key) => {
				let val = binds[key];

				if (typeof val == 'string') {
					this.fields.push(new r.Text(key, val));
				}

			});

			this.fields.forEach((v) => {
				this.elm.appendChild(v.deligate());
			});

			return true;
		}
    }
}
