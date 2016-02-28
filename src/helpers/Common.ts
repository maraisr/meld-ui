export class Common {
	public static hasher(len: number = 7): string {
		return Math.random().toString(36).substr(2, len)
	}
}
