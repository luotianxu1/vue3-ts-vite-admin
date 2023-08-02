import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import I18n from "@/lang/index"
import pinia from "@/stores"
import "@assets/scss/index.scss"
import directives from "@/directives/index" // 自定义指令
import "virtual:svg-icons-register" // svg icons
import ElementPlus from "element-plus"

const app = createApp(App)

// 注册全局组件
// import globalComponent from "@/components"
// app.use(globalComponent)
app.use(ElementPlus)
app.use(router)
app.use(I18n)
app.use(pinia)
app.use(directives)
app.mount("#app")
