/**
 * 获取浏览器默认语言
 * @returns {string}
 */
export function getBrowserLang() {
	const browserLang = navigator.language ? navigator.language : (navigator as any).browserLanguage
	let defaultBrowserLang = ""
	if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
		defaultBrowserLang = "zh"
	} else {
		defaultBrowserLang = "en"
	}
	return defaultBrowserLang
}

interface ISystemInfo {
	browserName: string // 浏览器名称
	browserVersion: string // 浏览器版本
	osName: string // 操作系统名称
	osVersion: string // 操作系统版本
	deviceName: string // 设备名称
}

/**
 * 获取系统信息
 * @returns {ISystemInfo}
 */
export function userAgent(): ISystemInfo {
	const browserReg: any = {
		Chrome: /Chrome/,
		IE: /MSIE/,
		Firefox: /Firefox/,
		Opera: /Presto/,
		Safari: /Version\/([\d.]+).*Safari/,
		"360": /360SE/,
		QQBrowswe: /QQ/,
		Edge: /Edg/
	}
	const deviceReg: any = {
		iPhone: /iPhone/,
		iPad: /iPad/,
		Android: /Android/,
		Windows: /Windows/,
		Mac: /Macintosh/
	}
	const userAgentStr = navigator.userAgent
	const userAgentObj = {
		browserName: "",
		browserVersion: "",
		osName: "",
		osVersion: "",
		deviceName: ""
	}
	for (const key in browserReg) {
		if (browserReg[key].test(userAgentStr)) {
			userAgentObj.browserName = key
			if (key === "Chrome") {
				userAgentObj.browserVersion = userAgentStr.split("Chrome/")[1].split(" ")[0]
			} else if (key === "IE") {
				userAgentObj.browserVersion = userAgentStr.split("MSIE ")[1].split(" ")[1]
			} else if (key === "Firefox") {
				userAgentObj.browserVersion = userAgentStr.split("Firefox/")[1]
			} else if (key === "Opera") {
				userAgentObj.browserVersion = userAgentStr.split("Version/")[1]
			} else if (key === "Safari") {
				userAgentObj.browserVersion = userAgentStr.split("Version/")[1].split(" ")[0]
			} else if (key === "360") {
				userAgentObj.browserVersion = ""
			} else if (key === "QQBrowswe") {
				userAgentObj.browserVersion = userAgentStr.split("Version/")[1].split(" ")[0]
			} else if (key === "Edge") {
				userAgentObj.browserVersion = userAgentStr.split("Edg/")[1].split(" ")[0]
			}
		}
	}

	for (const key in deviceReg) {
		if (deviceReg[key].test(userAgentStr)) {
			userAgentObj.osName = key
			if (key === "Windows") {
				userAgentObj.osVersion = userAgentStr.split("Windows NT ")[1].split(";")[0]
			} else if (key === "Mac") {
				userAgentObj.osVersion = userAgentStr.split("Mac OS X ")[1].split(")")[0]
			} else if (key === "iPhone") {
				userAgentObj.osVersion = userAgentStr.split("iPhone OS ")[1].split(" ")[0]
			} else if (key === "iPad") {
				userAgentObj.osVersion = userAgentStr.split("iPad; CPU OS ")[1].split(" ")[0]
			} else if (key === "Android") {
				userAgentObj.osVersion = userAgentStr.split("Android ")[1].split(";")[0]
				userAgentObj.deviceName = userAgentStr.split("(Linux; Android ")[1].split("; ")[1].split(" Build")[0]
			}
		}
	}
	return userAgentObj
}
