// 首页相关
export namespace Dashboard {
	// 顶部数据
	export interface ITodaysDataItem {
		title: string
		tips: string
		number: number
		subTitle: string
		value: number
		week: { title: string; value: number }[]
	}

	// 实时数据
	export interface IRealTimeDataItem {
		time: "fiveYear" | "oneYear" | "oneMonth"
		data: { time: string; catering: number; retail: number }[]
	}

	// 公告
	export interface IAnnouncementDataItem {
		content: ""
		time: ""
		type: 1 | 2 | 3
	}

	// 商品订单分布占比
	export interface IOrderDistributionDataItem {
		name: string
		value: number
	}

	// 月销售品牌排行
	export interface ISalesRankOptionsDataItem {
		name: string
		percent: number
		total: number
		finished: number
	}

	// 常用功能
	export interface ICommonFunctionItem {
		icon: string
		title: string
		url: string
	}

	// 查询首页顶部数据
	export interface IResDashBoardDataList {
		todaysData: ITodaysDataItem[]
		realTimeData: IRealTimeDataItem[]
		announcementData: IAnnouncementDataItem[]
		orderDistributionData: IOrderDistributionDataItem[]
		salesRankOptionsData: ISalesRankOptionsDataItem[]
		commonFunctionData: ICommonFunctionItem[]
	}
}
