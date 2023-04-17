import type { IMenuOptions } from "@/types"

/**
 * 扁平化数组
 */
export function getFlatArr(menuList: IMenuOptions[]) {
	const newMenuList: IMenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.reduce((pre: IMenuOptions[], current: IMenuOptions) => {
		let flatArr: IMenuOptions[]
		if (current.permission) {
			flatArr = [...pre]
		} else {
			flatArr = [...pre, current]
		}
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
		return flatArr
	}, [])
}

/**
 * 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param menuList
 * @returns
 */
export function getShowMenuList(menuList: IMenuOptions[]) {
	const newMenuList: IMenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children))
		return !item.meta?.isHide && !item.permission
	})
}

/**
 *
 * @param menuList 递归找出所有面包屑导航
 * @param result
 * @param parent
 * @returns
 */
export const getAllBreadcrumbList = (menuList: IMenuOptions[], result: { [key: string]: any } = {}, parent = []) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item]
		if (item.children) getAllBreadcrumbList(item.children, result, result[item.path])
	}
	return result
}

/**
 * 递归找出所有按钮权限
 * @param menuList
 * @returns
 */
export const getAllPermissions = (menuList: IMenuOptions[]) => {
	const permissionsList: string[] = []
	const recurseGetPermission = (menus: any[]) => {
		for (const item of menus) {
			if (item.permission) {
				permissionsList.push(item.permission)
			} else {
				recurseGetPermission(item.children ?? [])
			}
		}
	}
	recurseGetPermission(menuList)
	return permissionsList
}
