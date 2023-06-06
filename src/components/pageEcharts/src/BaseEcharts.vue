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
		echartsInstance?.setOption(newVal || {})
	}
)

onMounted(() => {
	echartsInstance = echarts.init(echartsRef.value!, "light", {
		renderer: "canvas"
	})

	window.addEventListener("resize", resize)
})

const resize = () => {
	echartsInstance?.resize()
}

const dispose = () => {
	echartsInstance?.dispose()
}

onBeforeUnmount(() => {
	dispose()
	window.removeEventListener("resize", resize)
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
