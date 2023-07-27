// 首页顶部数据
export interface IDashboardItem {
	title: string
	tips: string
	number: number
	subTitle: string
	value: number
	week: { title: string; value: number }[]
}

// 查询首页顶部数据
export interface IDashboardList {
	list: IDashboardItem[]
}
