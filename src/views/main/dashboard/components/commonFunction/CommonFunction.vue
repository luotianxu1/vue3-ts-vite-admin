<template>
	<ChartCard title="常用功能">
		<template #sub>
			<span class="placeholder link">自定义</span>
		</template>
		<div class="function">
			<div v-for="(item, index) in list" :key="index">
				<div class="circle">
					<i class="iconfont" :class="item.icon"></i>
				</div>
				{{ item.title }}
			</div>
		</div>
	</ChartCard>
</template>

<script lang="ts" setup>
import ChartCard from "../chartCard/ChartCard.vue"

const list = [
	{
		icon: "icon-xinzeng",
		title: "发布商品"
	},
	{
		icon: "icon-myCenter",
		title: "客户管理"
	},
	{
		icon: "icon-shop",
		title: "商品管理"
	},
	{
		icon: "icon-jiaoseguanli",
		title: "售后管理"
	},
	{
		icon: "icon-dianhua",
		title: "客服对话"
	},
	{
		icon: "icon-shopping",
		title: "全部订单"
	}
]
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
