// 引入项目中全部全局组件
import type { App } from "vue"
import SvgIcon from "./svgIcon/index.vue"

const allGlobalComponents = {
	SvgIcon
}

export default {
	install(app: App<Element>) {
		Object.keys(allGlobalComponents).forEach(key => {
			// 注册全局组件
			app.component(key, allGlobalComponents[key as keyof typeof allGlobalComponents])
		})
	}
}
