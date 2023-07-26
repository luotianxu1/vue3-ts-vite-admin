<template>
	<div class="card">
		<div class="card-title">{{ props.title }}</div>
		<div class="card-number" ref="countRef">{{ props.number }}</div>
		<div class="card-qushi">
			<span>{{ props.subTitle }}</span>
			<span :class="props.value > 0 ? 'red' : 'green'">
				{{ props.value }}%
				<i class="iconfont" :class="props.value > 0 ? 'icon-shangsheng' : 'icon-xiajiang'"></i>
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CountUp } from "countup.js"

interface IProps {
	title: string
	tips: string
	number: number
	subTitle: string
	value: number
}
const props = defineProps<IProps>()

const countRef = ref<HTMLElement>()
onMounted(() => {
	const countUp = new CountUp(countRef.value!, props.number)
	countUp.start()
})
</script>

<style lang="scss" scoped>
.card {
	padding: 15px;
	line-height: 30px;
	text-align: left;
	background-color: var(--base-color);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.0470588235294118);

	.card-title {
		position: relative;
		padding-left: 15px;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 5px;
			height: 100%;
			background-color: var(--el-color-primary);
			border-radius: 10px;
			content: "";
		}
	}

	.card-number {
		margin: 10px 0;
		font-size: 26px;
		font-weight: 600;
		letter-spacing: 2px;
	}

	.card-qushi {
		display: flex;
		font-size: 14px;
		align-items: center;
	}
}

.red {
	color: #f56c6c;
}

.green {
	color: #94d870;
}
</style>
