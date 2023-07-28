<template>
	<Card title="常用功能">
		<template #sub>
			<span class="placeholder link">自定义</span>
		</template>
		<div class="function">
			<div v-for="(item, index) in $props.commonFunctionData" :key="index">
				<div class="circle">
					<i class="iconfont" :class="item.icon"></i>
				</div>
				{{ item.title }}
			</div>
		</div>
	</Card>
</template>

<script lang="ts" setup>
import type { ICommonFunctionItem } from "@/types/modules/dashboard"
import Card from "@components/card/Card.vue"

interface IProps {
	commonFunctionData: ICommonFunctionItem[]
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.function {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 20px;
	align-items: stretch;
	flex-wrap: wrap;
	justify-content: space-around;
	align-content: space-between;

	> div {
		display: flex;
		width: 30%;
		height: 50%;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.circle {
			width: 50px;
			height: 50px;
			margin-bottom: 10px;
			line-height: 50px;
			text-align: center;
			background-color: var(--el-color-primary-light-9);
			border-radius: 50%;
			transition: 0.2s;

			i {
				font-size: 24px;
				color: var(--el-color-primary);
			}

			&:hover {
				cursor: pointer;
				scale: 1.3;
			}
		}
	}
}
</style>
