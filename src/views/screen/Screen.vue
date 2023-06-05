<template>
	<div class="container">
		<div class="screen" ref="screen">
			<div class="top">
				<Top></Top>
			</div>
			<div class="bottom">
				<div class="left">
					<Tourist class="tourist"></Tourist>
					<Sex class="sex"></Sex>
					<Age class="age"></Age>
				</div>
				<div class="center">
					<Map class="map"></Map>
					<Line class="line"></Line>
				</div>
				<div class="right">
					<Rank class="rank"></Rank>
					<Year class="year"></Year>
					<Counter class="counter"></Counter>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Top from "./components/top/Top.vue"
import Tourist from "./components/tourist/Tourist.vue"
import Sex from "./components/sex/Sex.vue"
import Age from "./components/age/Age.vue"
import Line from "./components/line/Line.vue"
import Map from "./components/map/Map.vue"
import Rank from "./components/rank/Rank.vue"
import Year from "./components/year/Year.vue"
import Counter from "./components/counter/Counter.vue"

let screen = ref<HTMLElement>()

onMounted(() => {
	if (screen.value) {
		screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
	}
	window.addEventListener("resize", resize)
})

onBeforeUnmount(() => {
	window.removeEventListener("resize", resize)
})

// 定义大屏缩放比例
const getScale = (w = 1920, h = 1080) => {
	const ww = window.innerWidth / w
	const wh = window.innerHeight / h
	return ww < wh ? ww : wh
}

// 监听浏览器 resize 事件
const resize = () => {
	if (screen.value) {
		screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
	}
	// 使用了 scale 的echarts其实不需要需要重新计算缩放比例
	// Object.values(screen.value).forEach(chart => {
	// 	console.log(chart)

	// 	chart && chart.resize()
	// })
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	background: url(../../assets/images/screen/bg.png) no-repeat;
	background-size: cover;

	.screen {
		position: fixed;
		left: 50%;
		top: 50%;
		width: 1920px;
		height: 1080px;
		transform-origin: left top;

		.top {
			width: 100%;
			height: 40px;
		}

		.bottom {
			display: flex;

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20px;

				.rank {
					flex: 1.5;
				}

				.year {
					flex: 1;
				}

				.counter {
					flex: 1;
				}
			}

			.left {
				flex: 1;
				height: 1040px;
				display: flex;
				flex-direction: column;

				.tourist {
					flex: 1.2;
				}

				.sex {
					flex: 1;
				}

				.age {
					flex: 1;
				}
			}

			.center {
				flex: 2;
				display: flex;
				flex-direction: column;
				padding: 0 20px;

				.map {
					flex: 3;
				}

				.line {
					flex: 1;
				}
			}
		}
	}
}
</style>
