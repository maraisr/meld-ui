import {UiStructure} from 'Structure';

export class Common {
	public static hasher(len: number = 7): string {
		return Math.random().toString(36).substr(2, len)
	}

	public static titleCase(string: string): string {
		return string.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
}

export interface UiStandard {
	elm: string;
	binds: any;
	structure: Array<UiStructure>;
}
