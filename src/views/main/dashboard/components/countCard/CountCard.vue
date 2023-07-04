<template>
	<div class="countCard">
		<div>{{ props.title }}</div>
		<div ref="countRef">{{ props.number }}</div>
		<div>
			<span>{{ props.subTitle }}{{ props.value }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
// import gsap from "gsap"
import { CountUp } from "countup.js"

interface IProps {
	title: string
	tips: string
	number: number
	subTitle: string
	value: number
}
const props = defineProps<IProps>()

// 1、使用gsap
// const data = reactive({
// 	num: 0
// })
// const animateToValue = () => {
// 	gsap.to(data, {
// 		num: props.number,
// 		duration: 1
// 	})
// }
// animateToValue()

// 2、使用countup.js
const countRef = ref<HTMLElement>()
onMounted(() => {
	const countUp1 = new CountUp(countRef.value!, props.number)
	countUp1.start()
})
</script>

<style lang="scss" scoped>
.countCard {
	padding: 15px;
	line-height: 30px;
	text-align: left;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.0470588235294118);
}
</style>
