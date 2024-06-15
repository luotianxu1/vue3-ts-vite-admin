<template>
	<div class="main">
		<el-form :model="form" label-width="90px">
			<el-form-item label="工资">
				<el-input type="number" v-model="form.wage" />
			</el-form-item>
			<el-divider />
			<el-form-item label="养老保险">
				<el-input type="number" v-model="form.aged" />
			</el-form-item>
			<el-form-item label="比例">
				<el-input type="number" v-model="form.agedNum">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<el-form-item label="金额">
				<el-input type="number" disabled v-model="agedPrice" />
			</el-form-item>
			<el-form-item label="医疗保险">
				<el-input type="number" v-model="form.medicalTreatment" />
			</el-form-item>
			<el-form-item label="比例">
				<el-input type="number" v-model="form.medicalTreatmentNum">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<el-form-item label="金额">
				<el-input type="number" disabled v-model="medicalTreatmentPrice" />
			</el-form-item>
			<el-form-item label="失业保险">
				<el-input type="number" v-model="form.beUnemployed" />
			</el-form-item>
			<el-form-item label="比例">
				<el-input type="number" v-model="form.beUnemployedNum">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<el-form-item label="金额">
				<el-input type="number" disabled v-model="beUnemployedPrice" />
			</el-form-item>
			<el-form-item label="公积金">
				<el-input type="number" v-model="form.reserveFund" />
			</el-form-item>
			<el-form-item label="比例">
				<el-input type="number" v-model="form.reserveFundNum">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<el-form-item label="金额">
				<el-input type="number" disabled v-model="reserveFundPrice" />
			</el-form-item>
			<el-divider />
			<el-form-item label="合记">
				<el-input type="number" disabled v-model="allPrice" />
			</el-form-item>
			<el-divider />
			<el-form-item label="实发">
				<el-input type="number" disabled v-model="money" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
const form = reactive({
	wage: 0, // 工资
	aged: 0, // 养老
	agedNum: 8,
	medicalTreatment: 0, // 医疗
	medicalTreatmentNum: 2,
	beUnemployed: 0, // 失业
	beUnemployedNum: 0.5,
	reserveFund: 0, // 公积金
	reserveFundNum: 12
})

const ageScale = computed(() => {
	return form.agedNum * 0.01
})
const agedPrice = computed(function () {
	return form.aged * ageScale.value
})

const medicalTreatmentScale = computed(() => {
	return form.medicalTreatmentNum * 0.01
})
const medicalTreatmentPrice = computed(function () {
	return form.medicalTreatment * medicalTreatmentScale.value
})

const beUnemployedScale = computed(() => {
	return form.beUnemployedNum * 0.01
})
const beUnemployedPrice = computed(function () {
	return form.beUnemployed * beUnemployedScale.value
})

const reserveFundScale = computed(() => {
	return form.reserveFundNum * 0.01
})
const reserveFundPrice = computed(function () {
	return form.reserveFund * reserveFundScale.value
})

const allPrice = computed(() => {
	return agedPrice.value + medicalTreatmentPrice.value + beUnemployedPrice.value + reserveFundPrice.value
})

const money = computed(() => {
	return form.wage - allPrice.value
})

watch(
	() => form.wage,
	(newVal, oldVal) => {
		console.log(newVal)
		form.aged = newVal
		form.medicalTreatment = newVal
		form.beUnemployed = newVal
		form.reserveFund = newVal
	}
)
</script>
<style scoped lang="scss">
.main {
	width: 100vw;
	height: 100vh;
	padding: 10px;
	overflow-y: auto;
}
</style>
