<template>
	<div class="echarts" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"
import "echarts-liquidfill"

interface IProps {
	option: EChartsOption | undefined
}

const props = defineProps<IProps>()

watch(
	() => props.option,
	newVal => {
		echartsInstance.setOption(newVal || {})
	}
)

const echartsRef = ref<HTMLElement>()
let echartsInstance: echarts.ECharts
onMounted(() => {
	echartsInstance = echarts.init(echartsRef.value!, "light", {
		renderer: "canvas"
	})

	window.addEventListener("resize", resize)
})

onUnmounted(() => {
	window.removeEventListener("resize", resize)
})

const resize = () => {
	if (!echartsRef.value) return
	echartsInstance.resize()
}
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
