import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import I18n from "@/lang/index"
import pinia from "@/stores"
import "@assets/scss/index.scss"
import directives from "@/directives/index" // 自定义指令
import * as globalVariables from "@/utils/global.js"
import "virtual:svg-icons-register" // svg icons

const app = createApp(App)

for (const key in globalVariables) {
	app.config.globalProperties[`$${key}`] = globalVariables[key as keyof typeof globalVariables]
}

// 注册全局组件
// import globalComponent from "@/components"
// app.use(globalComponent)

app.use(router)
app.use(I18n)
app.use(pinia)
app.use(directives)
app.mount("#app")
