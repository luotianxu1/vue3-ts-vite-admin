// 菜单相关
// 菜单相关
export namespace Menu {
	// 路由
	export interface IMetaProps {
		icon: string
		title: string
		activeMenu?: string
		isLink?: string
		isHide: boolean
		isFull: boolean
		isKeepAlive: boolean
	}

	// 菜单信息
	export interface IMenuOptions {
		path: string
		name: string
		component?: string | (() => Promise<any>)
		redirect?: string
		meta: IMetaProps
		children?: IMenuOptions[]
		permission?: string
	}

	// 菜单返回
	export interface IResMenuList {
		list: IMenuOptions[]
	}
}
