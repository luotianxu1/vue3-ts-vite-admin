<template>
	<div class="dashboard">
		<el-row :gutter="8">
			<HeaderItem v-for="(item, index) in todaysData" :key="index" :todaysData="item"></HeaderItem>
		</el-row>
		<el-row :gutter="8" class="row">
			<!-- 实时数据 -->
			<el-col :span="16">
				<RealTimeData class="item" :realTimeData="realTimeData"></RealTimeData>
			</el-col>
			<!-- 公告 -->
			<el-col :span="8">
				<Announcement class="item" :announcementData="announcementData"></Announcement>
			</el-col>
		</el-row>
		<el-row :gutter="8" class="row">
			<!-- 商品订单分布占比 -->
			<el-col :span="8">
				<OrderDistribution class="item" :orderDistributionData="orderDistributionData"></OrderDistribution>
			</el-col>
			<!-- 月销售品牌排行 -->
			<el-col :span="8">
				<MonthlySales class="item" :salesRankOptionsData="salesRankOptionsData"></MonthlySales>
			</el-col>
			<!-- 常用功能 -->
			<el-col :span="8">
				<CommonFunction class="item" :commonFunctionData="commonFunctionData"></CommonFunction>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import HeaderItem from "./components/headerItem/HeaderItem.vue"
import CommonFunction from "./components/commonFunction/CommonFunction.vue"
import MonthlySales from "./components/monthlySales/MonthlySales.vue"
import Announcement from "./components/announcement/Announcement.vue"
import OrderDistribution from "./components/orderDistribution/OrderDistribution.vue"
import RealTimeData from "./components/realTimeData/RealTimeData.vue"
import { getDashboardDataList } from "@service/modules/dahboard"
import type { Dashboard } from "@/types/modules/dashboard"

onMounted(() => {
	getDashboardData()
})

const todaysData = ref<Dashboard.ITodaysDataItem[]>([])
const realTimeData = ref<Dashboard.IRealTimeDataItem[]>([])
const announcementData = ref<Dashboard.IAnnouncementDataItem[]>([])
const orderDistributionData = ref<Dashboard.IOrderDistributionDataItem[]>([])
const salesRankOptionsData = ref<Dashboard.ISalesRankOptionsDataItem[]>([])
const commonFunctionData = ref<Dashboard.ICommonFunctionItem[]>([])
const getDashboardData = async () => {
	const res = await getDashboardDataList({})

	todaysData.value = res.data.todaysData
	realTimeData.value = res.data.realTimeData
	announcementData.value = res.data.announcementData
	orderDistributionData.value = res.data.orderDistributionData
	salesRankOptionsData.value = res.data.salesRankOptionsData
	commonFunctionData.value = res.data.commonFunctionData
}
</script>

<style lang="scss" scoped>
.dashboard {
	height: 100%;
	padding: 15px;
	overflow: auto;
}

.item {
	height: 310px;
}

.row {
	margin-top: 10px;
}
</style>
