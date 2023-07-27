<template>
	<el-row :gutter="10">
		<el-col :span="6" v-for="(item, index) in amountList" :key="index">
			<CountCard v-bind="item"></CountCard>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { getDashboardList } from "@/service/modules/dahboard"
import type { IDashboardItem } from "@/types"
import CountCard from "../countCard/CountCard.vue"

let amountList = ref<IDashboardItem[]>()
const getList = async () => {
	const res = await getDashboardList({})
	amountList.value = res.data?.list
}
getList()
</script>

<style lang="scss" scoped></style>
