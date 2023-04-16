// 部门信息
export interface IDepartment {
	id: string
	name: string
}

// 查询部门返回
export interface IDepartmentResult {
	list: IDepartment[]
}
