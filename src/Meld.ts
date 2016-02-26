import {Elements as e} from 'Elements';

export module Meld {

	interface UiConfig {
		selectTemplate:string;
	}

    export class Ui {
		private config:UiConfig;
		public elm:HTMLElement;

        constructor(elm:HTMLElement, config:UiConfig) {
			this.elm = elm;
			this.config = config;

			// TODO: This is only a test - remove later..
			this.elm.innerHTML = config.selectTemplate;
        }
    }
}
