import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export interface RequestInterceptors<T = AxiosResponse> {
	requsetInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
	requestInterceptorCatch?: (error: any) => any
	responseInterceptor?: (config: T) => T
	responseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>
	showLoading?: boolean
}
