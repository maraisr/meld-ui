import {Elements as e} from 'Elements';

export module Meld {
	interface UiTemplates {
		input: string;
	}

	interface UiConfig {
		templates: UiTemplates;
	}

	interface UiBind {
		type: string;
		bind: string;
	}

    export class Ui {
		public elm: HTMLElement;
		private config: UiConfig;

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

		public render(binds: Array<UiBind>): Boolean {
			return true;
		}
    }
}
