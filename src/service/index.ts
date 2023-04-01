import Request from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"

const api = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requsetInterceptor: config => {
			const token = ""
			if (token) {
				config.headers.Authorization = `Bear ${token}`
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
