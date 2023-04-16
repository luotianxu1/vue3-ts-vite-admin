<template>
	<div class="echarts" ref="echartsRef"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

interface IProps {
	option: EChartsOption
}

const props = defineProps<IProps>()

const echartsRef = ref<HTMLElement>()

onMounted(() => {
	const echartsInstance = echarts.init(echartsRef.value!, "light", {
		renderer: "canvas"
	})
	echartsInstance.setOption(props.option)
})
</script>

<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
