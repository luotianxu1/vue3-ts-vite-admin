<template>
	<div class="dashboard">
		<el-row :gutter="10">
			<template v-for="(item, index) in amountList" :key="index">
				<el-col :span="6">
					<CountCard v-bind="item"></CountCard>
				</el-col>
			</template>
		</el-row>
		<el-row :gutter="8" style="margin-top: 20px">
			<el-col :span="8">
				<ChartCard>
					<PieEcharts></PieEcharts>
				</ChartCard>
			</el-col>
			<el-col :span="8">
				<ChartCard>
					<RoseEcharts></RoseEcharts>
				</ChartCard>
			</el-col>
			<el-col :span="8">
				<ChartCard>
					<LineEcharts></LineEcharts>
				</ChartCard>
			</el-col>
		</el-row>
		<el-row :gutter="8" style="margin-top: 20px">
			<el-col :span="12">
				<ChartCard>
					<LineEcharts></LineEcharts>
				</ChartCard>
			</el-col>
			<el-col :span="12">
				<ChartCard>
					<PieEcharts></PieEcharts>
				</ChartCard>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import { getDashboardList } from "@/service/modules/dahboard"
import type { IDashboardItem } from "@/types"
import CountCard from "./components/countCard/CountCard.vue"
import ChartCard from "./components/chartCard/ChartCard.vue"

let amountList = ref<IDashboardItem[]>()
const getList = async () => {
	const res = await getDashboardList({})
	amountList.value = res.data?.list
}
getList()
</script>

<style lang="scss" scoped>
.dashboard {
	padding: 20px;
	height: 100%;
	overflow: auto;
}
</style>
