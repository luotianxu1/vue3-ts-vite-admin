export function globalStaticAssets(url: any) {
	return new URL(`../assets/img/${url}`, import.meta.url).href
}

/**
 * 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return {string}
 */
export function isType(val: any) {
	if (val === null) return "null"
	if (typeof val !== "object") return typeof val
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
	return Math.floor(Math.random() * (min - max) + max)
}

/**
 * 判断是否在对象内
 * @param key
 * @param object
 * @returns
 */
export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object
}
