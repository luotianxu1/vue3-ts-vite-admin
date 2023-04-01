import { createApp } from "vue"
import { createPinia } from "pinia"
import "normalize.css"
import "@assets/scss/index.scss"
import "element-plus/theme-chalk/dark/css-vars.css"
import I18n from "@/lang/index"
import router from "./router"
import App from "./App.vue"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(I18n)
app.mount("#app")
