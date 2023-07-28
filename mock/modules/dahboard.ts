import type { MockMethod } from "vite-plugin-mock"

export const dahboardApiList: MockMethod[] = [
	// 首页
	{
		url: "/testApi/count/list",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询成功！",
				data: {
					list: [
						{
							title: "今日交易额(元)",
							tips: "stringy",
							number: 714400,
							subTitle: "同比昨日",
							value: 1.6,
							week: [
								{ title: "周一", value: 714400 },
								{ title: "周二", value: 500000 },
								{ title: "周三", value: 714400 },
								{ title: "周四", value: 814400 },
								{ title: "周五", value: 300000 },
								{ title: "周六", value: 814400 },
								{ title: "周日", value: 714400 }
							]
						},
						{
							title: "今日订单量(元)",
							tips: "stringy",
							number: 5960,
							subTitle: "同比昨日",
							value: -0.5,
							week: [
								{ title: "周一", value: 700000 },
								{ title: "周二", value: 600000 },
								{ title: "周三", value: 714400 },
								{ title: "周四", value: 814400 },
								{ title: "周五", value: 314400 },
								{ title: "周六", value: 814400 },
								{ title: "周日", value: 714400 }
							]
						},
						{
							title: "今日浏览量",
							tips: "stringy",
							number: 12218,
							subTitle: "同比昨日",
							value: -0.5,
							week: [
								{ title: "周一", value: 714400 },
								{ title: "周二", value: 614400 },
								{ title: "周三", value: 714400 },
								{ title: "周四", value: 0 },
								{ title: "周五", value: 314400 },
								{ title: "周六", value: 814400 },
								{ title: "周日", value: 714400 }
							]
						},
						{
							title: "新增会员",
							tips: "stringy",
							number: 2452,
							subTitle: "同比昨日",
							value: 4.0,
							week: [
								{ title: "周一", value: 714400 },
								{ title: "周二", value: 614400 },
								{ title: "周三", value: 714400 },
								{ title: "周四", value: 814400 },
								{ title: "周五", value: 314400 },
								{ title: "周六", value: 814400 },
								{ title: "周日", value: 714400 }
							]
						}
					]
				}
			}
		}
	}
]
