import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import I18n from "@/lang/index"
import pinia from "@/stores"
// import "default-passive-events"
import "normalize.css"
import "@assets/scss/index.scss"
import "element-plus/theme-chalk/dark/css-vars.css"
import directives from "@/directives/index"
import * as globalVariables from "@/utils/global.js"
// svg icons
import "virtual:svg-icons-register"

const app = createApp(App)

for (const key in globalVariables) {
	app.config.globalProperties[`$${key}`] = globalVariables[key as keyof typeof globalVariables]
}

app.use(router)
app.use(I18n)
app.use(pinia)
app.use(directives)
app.mount("#app")
