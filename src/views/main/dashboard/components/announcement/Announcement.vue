<template>
	<ChartCard title="公告">
		<template #sub>
			<span class="placeholder link">详情</span>
		</template>
		<el-scrollbar>
			<div v-for="(i, index) in 90" :key="index" class="message">
				<span><el-tag type="success">消息</el-tag> <span>系统新版本，新功能介绍</span></span>
				<span class="placeholder">2022-11-04</span>
			</div>
		</el-scrollbar>
	</ChartCard>
</template>

<script lang="ts" setup>
import ChartCard from "../chartCard/ChartCard.vue"
</script>

<style lang="scss" scoped>
.message {
	display: flex;
	align-items: center;
	justify-content: space-between;

	> span {
		&:nth-child(1) {
			> span {
				margin-left: 10px;
			}
		}
	}
}
</style>
