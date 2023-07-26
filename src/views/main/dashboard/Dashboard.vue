<template>
	<div class="dashboard">
		<Header></Header>
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
import ChartCard from "./components/chartCard/ChartCard.vue"
import Header from "./components/header/Header.vue"
</script>

<style lang="scss" scoped>
.dashboard {
	height: 100%;
	padding: 20px;
	overflow: auto;
}
</style>
