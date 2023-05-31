import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createStyleImportPlugin, ElementPlusResolve } from "vite-plugin-style-import"
import { viteMockServe } from "vite-plugin-mock"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { resolve } from "path"
import setupExtend from "vite-plugin-vue-setup-extend"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					prefix: "Icon"
				})
			],
			imports: ["vue", "vue-router", "pinia"],
			dts: "src/types/auto-imports.d.ts",
			eslintrc: {
				enabled: false, // Default `false`
				filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			}
		}),
		Components({
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					enabledCollections: ["ep"]
				})
			],
			dts: "src/types/components.d.ts"
		}),
		Icons({
			autoInstall: true
		}),
		// setup语法糖设置名字
		setupExtend(),
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
		}),
		viteMockServe(),
		// 生产环境mock
		viteMockServe({
			// 更多配置见最下方
			mockPath: "./mock/", //mock文件地址
			localEnabled: false, // 开发打包开关
			prodEnabled: true, // 生产打包开关 // 这样可以控制关闭mock的时候不让mock打包到最终代码内
			injectCode: ` import { setupProdMockServer } from './utils/mockProdServer'; setupProdMockServer(); `,
			logger: false, //是否在控制台显示请求日志
			supportTs: true //打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
		}),
		// 使用 svg 图标
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), "src/assets/svg")],
			symbolId: "icon-[dir]-[name]"
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@views": fileURLToPath(new URL("./src/views", import.meta.url)),
			"@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
			"@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
			"@global": fileURLToPath(new URL("./src/global", import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				javascriptEnabled: true,
				additionalData: '@import "@/assets/scss/variable.scss";'
			}
		}
	}
})
