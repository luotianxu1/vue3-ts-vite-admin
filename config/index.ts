import baseConfig from "./base"
import devConfig from "./dev"
import buildConfig from "./build"

export const envResolver = {
	development: () => {
		console.log(" --- development ---")
		return Object.assign({}, baseConfig, devConfig)
	},
	production: () => {
		console.log("--- production ---")
		return Object.assign({}, baseConfig, buildConfig)
	}
}
