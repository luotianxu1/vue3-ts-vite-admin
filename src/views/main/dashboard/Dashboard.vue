<template>
	<div class="dashboard">
		<Header></Header>
		<el-row :gutter="8" style="margin-top: 10px">
			<!-- 实时数据 -->
			<el-col :span="16">
				<RealTimeData class="item"></RealTimeData>
			</el-col>
			<!-- 公告 -->
			<el-col :span="8">
				<Announcement class="item"></Announcement>
			</el-col>
		</el-row>
		<el-row :gutter="8" style="margin-top: 10px">
			<!-- 商品订单分布占比 -->
			<el-col :span="8">
				<OrderDistribution class="item"></OrderDistribution>
			</el-col>
			<!-- 月销售品牌排行 -->
			<el-col :span="8">
				<MonthlySales class="item"></MonthlySales>
			</el-col>
			<!-- 常用功能 -->
			<el-col :span="8">
				<CommonFunction class="item"></CommonFunction>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import Header from "./components/header/Header.vue"
import CommonFunction from "./components/commonFunction/CommonFunction.vue"
import MonthlySales from "./components/monthlySales/MonthlySales.vue"
import Announcement from "./components/announcement/Announcement.vue"
import OrderDistribution from "./components/orderDistribution/OrderDistribution.vue"
import RealTimeData from "./components/realTimeData/RealTimeData.vue"
</script>

<style lang="scss" scoped>
.dashboard {
	height: 100%;
	padding: 20px;
	overflow: auto;
}

.item {
	height: 310px;
}
</style>
