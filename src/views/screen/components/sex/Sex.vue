<template>
	<Box title="男女比例">
		<template #bottom>
			<div class="img">
				<div class="man">
					<img src="../../../../assets/images/screen/man.png" alt="" />
				</div>
				<div class="women">
					<img src="../../../../assets/images/screen/woman.png" alt="" />
				</div>
			</div>
			<div class="rate">
				<p>男士58%</p>
				<p>女士42%</p>
			</div>
			<div class="charts">
				<BaseEcharts :option="options"></BaseEcharts>
			</div>
		</template>
	</Box>
</template>

<script lang="ts" setup>
import type { EChartsOption } from "echarts"
import Box from "../box/Box.vue"

let options = ref<EChartsOption>()
onMounted(() => {
	options.value = {
		title: {
			text: "男女比例"
		},
		xAxis: {
			show: false,
			min: 0,
			max: 100
		},
		yAxis: {
			show: false,
			type: "category"
		},
		series: [
			{
				type: "bar",
				data: [58],
				barWidth: 20,
				z: 100,
				itemStyle: {
					borderRadius: 20
				}
			},
			{
				type: "bar",
				data: [100],
				barWidth: 20,
				barGap: "-100%",
				itemStyle: {
					color: "pink",
					borderRadius: 20
				}
			}
		],
		grid: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}
	}
})
</script>

<style lang="scss" scoped>
.img {
	display: flex;
	align-items: center;
	justify-content: center;

	.man {
		width: 111px;
		height: 115px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px;
		background: url(../../../../assets/images/screen/man-bg.png);
	}
	.women {
		width: 111px;
		height: 115px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px;
		background: url(../../../../assets/images/screen/woman-bg.png);
	}
}

.rate {
	display: flex;
	justify-content: space-between;
	color: white;
}

.charts {
	height: 100px;
}
</style>
