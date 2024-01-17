import { defineConfig } from "vite"
import { envResolver } from "./config"

export default defineConfig(({ mode }) => {
	return envResolver[mode]()
})
