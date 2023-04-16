// 部门信息
export interface IDashboardItem {
	title: string
	tips: string
	number: number
	subTitle: string
	value: number
}

// 查询部门返回
export interface IDashboardList {
	list: IDashboardItem[]
}
