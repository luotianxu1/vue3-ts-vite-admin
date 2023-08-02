<template>
	<el-config-provider :z-index="3000" :locale="localLanguage" :message="config" :size="size">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/stores/modules/global"
import en from "element-plus/es/locale/lang/en"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()
const globalStore = GlobalStore()
const localLanguage = computed((): any => {
	locale.value = globalStore.language
	if (globalStore.language && globalStore.language === "zh") {
		return zhCn
	}
	if (globalStore.language === "en") {
		return en
	}
	return ""
})

const config = reactive({
	max: 3
})

const size = ref<"large" | "default" | "small">("default")
</script>

<style scoped lang="scss"></style>
