import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import type { RequestConfig, RequestInterceptors } from "./types"
import { ElLoading } from "element-plus"

const DEFAULT_LOADING = true

class Request {
	instance: AxiosInstance
	interceptors?: RequestInterceptors
	showLoading: boolean
	loading: any

	constructor(config: RequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config)

		// 保存基本信息
		this.showLoading = config.showLoading ?? DEFAULT_LOADING
		this.interceptors = config.interceptors

		// 从config中取出的拦截器是对应的实例的拦截器(放在上面的先执行)
		this.instance.interceptors.request.use(this.interceptors?.requsetInterceptor, this.interceptors?.requestInterceptorCatch)
		this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch)

		// 添加所有实例都有的拦截器
		this.instance.interceptors.request.use(
			config => {
				if (this.showLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: "正在请求数据...",
						background: "rgba(0,0,0,0.5)"
					})
				}
				return config
			},
			error => {
				return error
			}
		)
		this.instance.interceptors.response.use(
			res => {
				this.loading?.close()
				const data = res.data
				if (data.returnCode === "-1001") {
					console.log("请求失败")
				} else {
					return data
				}
			},
			error => {
				this.loading?.close()
				if (error.response.status === 404) {
					console.log("404")
				}
				return error
			}
		)
	}

	request<T>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 单个请求对请求config的处理
			if (config.interceptors?.requsetInterceptor) {
				config = config.interceptors.requsetInterceptor(config as InternalAxiosRequestConfig)
			}
			// 判断是否需要显示loading
			if (config.showLoading === false) {
				this.showLoading = config.showLoading
			}
			this.instance
				.request<any, T>(config)
				.then(res => {
					// 单个请求对数据的处理
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res)
					}
					// 将showLoading设置true，这样不会影响下一个请求
					this.showLoading = DEFAULT_LOADING
					// 将结果通过resolve返回出去
					resolve(res)
				})
				.catch(err => {
					this.showLoading = DEFAULT_LOADING
					reject(err)
					return err
				})
		})
	}

	get<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "GET" })
	}

	post<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "POST" })
	}

	delete<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "DELETE" })
	}

	put<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "PUT" })
	}
}

export default Request
