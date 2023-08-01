// 部门相关
export namespace Department {
	// 部门信息
	export interface IDepartmentInfo {
		id: string
		name: string
	}

	// 查询部门返回
	export interface IResDepartmentList {
		list: IDepartmentInfo[]
	}
}
