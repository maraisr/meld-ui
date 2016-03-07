import {Common} from 'Common';

export interface UiStructure {
	field?: string;
	group?: string;
	input?: string;
	display?: string;
	class?: string;
	inputClass?: string;
	hide?: Boolean;
}

export class Structure {
	private struct: Array<UiStructure> = new Array();

	constructor(config: Array<UiStructure>) {
		this.struct = config;
	}

	findStructure(which: string, search: string): UiStructure {
		let structure = this.struct.filter((v: UiStructure) => {
			return v[which] == search;
		}),
			sendStruct: UiStructure,
			found: Boolean = false;

		if (structure.length == 1) {
			found = true;
			sendStruct = {
				display: structure[0].display || Common.titleCase(search),
				class: structure[0].class || void 0,
				hide: structure[0].hide || false
			}
		} else {
			sendStruct = {
				display: Common.titleCase(search)
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
}
