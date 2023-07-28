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

const echartsRef = ref<HTMLElement>()
let echartsInstance: echarts.ECharts | null = null

watch(
	() => props.option,
	newVal => {
		nextTick(() => {
			echartsInstance?.setOption(newVal || {})
		})
	},
	{
		immediate: true,
		deep: true
	}
)

let resizeObserver: ResizeObserver
onMounted(() => {
	if (!echartsRef.value) return
	echartsInstance = echarts.init(echartsRef.value, "light", {
		renderer: "canvas"
	})

	// 监听元素
	resizeObserver = new ResizeObserver(() => {
		resize()
	})
	resizeObserver.observe(echartsRef.value)
})

const resize = () => {
	echartsInstance?.resize()
}

const dispose = () => {
	echartsInstance?.dispose()
}

onBeforeUnmount(() => {
	resizeObserver.disconnect()
	dispose()
})

defineExpose({
	echartsInstance,
	dispose
})
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
