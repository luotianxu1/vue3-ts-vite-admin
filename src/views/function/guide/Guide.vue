<template>
	<el-button type="primary" @click.prevent.stop="guide">打开引导页</el-button>
</template>

<script setup lang="ts">
import Driver from "driver.js"
import "driver.js/dist/driver.min.css"

const guide = () => {
	const driver: Driver = new Driver({
		allowClose: false,
		doneBtnText: "结束",
		closeBtnText: "关闭",
		nextBtnText: "下一步",
		prevBtnText: "上一步"
	})
	driver.defineSteps(steps)
	driver.start()
}

const steps = [
	{
		element: "#collapseIcon",
		popover: {
			title: "侧边栏切换图标",
			description: "切换侧边栏的打卡和关闭",
			position: "right"
		}
	},
	{
		element: "#breadcrumb",
		popover: {
			title: "面包屑",
			description: "面包屑导航",
			position: "right"
		}
	}
]
</script>

<style scoped lang="scss"></style>
