import type { IModalConfig } from "@/components/pageModal/type"

const modalConfig: IModalConfig = {
	header: {
		newTitle: "新增用户",
		editTitle: "修改用户"
	},
	formItems: [
		{
			type: "input",
			label: "用户名称",
			prop: "name",
			placeholder: "用户名称",
			initialValue: "132"
		},
		{
			type: "input",
			label: "密码",
			prop: "password",
			placeholder: "请输入密码"
		},
		{
			type: "select",
			prop: "department",
			label: "部门",
			placeholder: "请选择部门",
			options: []
		},
		{
			type: "select",
			prop: "enable",
			label: "状态",
			placeholder: "请选择查询状态",
			options: [
				{ label: "启动", value: 1 },
				{ label: "禁用", value: 0 }
			]
		}
	]
}

export default modalConfig
