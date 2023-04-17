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
			label: "名称",
			prop: "meta.title"
		},
		{
			label: "路径",
			prop: "path"
		},

		{
			type: "custom",
			label: "操作",
			prop: "status",
			sloatName: "btn",
			width: "150"
		}
	],
	childrenTree: {
		rowKey: "path",
		treeProps: {
			children: "children"
		}
	}
}

export default contentConfig
