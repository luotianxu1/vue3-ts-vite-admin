import { USER_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import Request from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const api = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requsetInterceptor: config => {
			const token = localCache.getCache(USER_TOKEN)
			if (config.headers && token) {
				config.headers.Authorization = "Bear " + localCache.getCache(USER_TOKEN)
			}
			return config
		},
		requestInterceptorCatch: error => {
			return error
		},
		responseInterceptor: res => {
			return res
		},
		responseInterceptorCatch: error => {
			return error
		}
	}
})

export default api
