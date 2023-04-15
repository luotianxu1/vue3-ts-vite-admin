const contentConfig = {
	header: {
		title: "列表"
	},
	propsList: [
		{
			type: "selection",
			label: "选择",
			width: "50"
		},
		{
			type: "index",
			label: "序号",
			width: "60"
		},
		{
			type: "normal",
			label: "用户名",
			prop: "name",
			width: "100"
		},
		{
			type: "normal",
			label: "年龄",
			prop: "age",
			width: "55"
		},
		{
			type: "normal",
			label: "手机号",
			prop: "phone",
			width: "120"
		},
		{
			type: "normal",
			label: "邮箱",
			prop: "email"
		},
		{
			type: "timer",
			label: "创建时间",
			prop: "addTime"
		},
		{
			type: "timer",
			label: "更新时间",
			prop: "editTime"
		},
		{
			type: "custom",
			label: "状态",
			prop: "status",
			sloatName: "status",
			width: "100"
		},
		{
			type: "custom",
			label: "操作",
			prop: "status",
			sloatName: "btn",
			width: "150"
		}
	]
}

export default contentConfig
