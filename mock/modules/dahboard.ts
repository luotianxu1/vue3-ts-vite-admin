import mockjs, { Random } from "mockjs"
import type { MockMethod } from "vite-plugin-mock"

const announcementData = mockjs.mock({
	"announcementData|30": [
		{
			content: "@cparagraph(1,3)",
			time: "@date",
			type: "@integer(1,3)"
		}
	]
})

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
					todaysData: [
						{
							title: "今日交易额(元)",
							tips: "stringy",
							number: Random.integer(1000, 10000),
							subTitle: "同比昨日",
							value: 1.6,
							week: [
								{ title: "周一", value: Random.integer(1000, 10000) },
								{ title: "周二", value: Random.integer(1000, 10000) },
								{ title: "周三", value: Random.integer(1000, 10000) },
								{ title: "周四", value: Random.integer(1000, 10000) },
								{ title: "周五", value: Random.integer(1000, 10000) },
								{ title: "周六", value: Random.integer(1000, 10000) },
								{ title: "周日", value: Random.integer(1000, 10000) }
							]
						},
						{
							title: "今日订单量(元)",
							tips: "stringy",
							number: Random.integer(1000, 10000),
							subTitle: "同比昨日",
							value: -0.5,
							week: [
								{ title: "周一", value: Random.integer(1000, 10000) },
								{ title: "周二", value: Random.integer(1000, 10000) },
								{ title: "周三", value: Random.integer(1000, 10000) },
								{ title: "周四", value: Random.integer(1000, 10000) },
								{ title: "周五", value: Random.integer(1000, 10000) },
								{ title: "周六", value: Random.integer(1000, 10000) },
								{ title: "周日", value: Random.integer(1000, 10000) }
							]
						},
						{
							title: "今日浏览量",
							tips: "stringy",
							number: Random.integer(1000, 10000),
							subTitle: "同比昨日",
							value: -0.5,
							week: [
								{ title: "周一", value: Random.integer(1000, 10000) },
								{ title: "周二", value: Random.integer(1000, 10000) },
								{ title: "周三", value: Random.integer(1000, 10000) },
								{ title: "周四", value: Random.integer(1000, 10000) },
								{ title: "周五", value: Random.integer(1000, 10000) },
								{ title: "周六", value: Random.integer(1000, 10000) },
								{ title: "周日", value: Random.integer(1000, 10000) }
							]
						},
						{
							title: "新增会员",
							tips: "stringy",
							number: Random.integer(1000, 10000),
							subTitle: "同比昨日",
							value: 4.0,
							week: [
								{ title: "周一", value: Random.integer(1000, 10000) },
								{ title: "周二", value: Random.integer(1000, 10000) },
								{ title: "周三", value: Random.integer(1000, 10000) },
								{ title: "周四", value: Random.integer(1000, 10000) },
								{ title: "周五", value: Random.integer(1000, 10000) },
								{ title: "周六", value: Random.integer(1000, 10000) },
								{ title: "周日", value: Random.integer(1000, 10000) }
							]
						}
					],
					realTimeData: [
						{
							time: "fiveYear",
							data: [
								{ time: "2019", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "2020", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "2021", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "2022", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "2023", catering: Random.integer(0, 100), retail: Random.integer(0, 100) }
							]
						},
						{
							time: "oneYear",
							data: [
								{ time: "1月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "2月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "3月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "4月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "5月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "6月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "7月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "8月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "9月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "10月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "11月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "12月", catering: Random.integer(0, 100), retail: Random.integer(0, 100) }
							]
						},
						{
							time: "oneMonth",
							data: [
								{ time: "5号", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "10号", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "15号", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "10号", catering: Random.integer(0, 100), retail: Random.integer(0, 100) },
								{ time: "25号", catering: Random.integer(0, 100), retail: Random.integer(0, 100) }
							]
						}
					],
					...announcementData,
					orderDistributionData: [
						{ value: Random.integer(0, 100), name: "rose 1" },
						{ value: Random.integer(0, 100), name: "rose 2" },
						{ value: Random.integer(0, 100), name: "rose 3" },
						{ value: Random.integer(0, 100), name: "rose 4" },
						{ value: Random.integer(0, 100), name: "rose 5" },
						{ value: Random.integer(0, 100), name: "rose 6" },
						{ value: Random.integer(0, 100), name: "rose 7" }
					],
					salesRankOptionsData: [
						{
							name: "佳能",
							percent: Random.integer(40, 100),
							total: Random.integer(10000, 20000),
							finished: Random.integer(10000, 20000)
						},
						{
							name: "松下",
							percent: Random.integer(40, 100),
							total: Random.integer(10000, 20000),
							finished: Random.integer(10000, 20000)
						},
						{
							name: "索尼",
							percent: Random.integer(40, 100),
							total: Random.integer(10000, 20000),
							finished: Random.integer(10000, 20000)
						},
						{
							name: "尼康",
							percent: Random.integer(40, 100),
							total: Random.integer(10000, 20000),
							finished: Random.integer(10000, 20000)
						},
						{
							name: "富士",
							percent: Random.integer(40, 100),
							total: Random.integer(10000, 20000),
							finished: Random.integer(10000, 20000)
						}
					],
					commonFunctionData: [
						{
							icon: "icon-xinzeng",
							title: "发布商品",
							url: ""
						},
						{
							icon: "icon-myCenter",
							title: "客户管理",
							url: ""
						},
						{
							icon: "icon-shop",
							title: "商品管理",
							url: ""
						},
						{
							icon: "icon-jiaoseguanli",
							title: "售后管理",
							url: ""
						},
						{
							icon: "icon-dianhua",
							title: "客服对话",
							url: ""
						},
						{
							icon: "icon-shopping",
							title: "全部订单",
							url: ""
						}
					]
				}
			}
		}
	}
]
