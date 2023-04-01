import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createStyleImportPlugin, ElementPlusResolve } from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ["vue", "vue-router", "pinia"],
			dts: "src/types/auto-imports.d.ts",
			eslintrc: {
				enabled: false, // Default `false`
				filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			}
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			dts: "src/types/components.d.ts"
		}),
		// 自动引入element-plus样式
		createStyleImportPlugin({
			resolves: [ElementPlusResolve()],
			libs: [
				{
					libraryName: "element-plus",
					esModule: true,
					resolveStyle: name => {
						return `element-plus/theme-chalk/${name}.css`
					}
				}
			]
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@views": fileURLToPath(new URL("./src/views", import.meta.url))
		}
	}
})
