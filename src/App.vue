<template>
	<el-config-provider :z-index="3000" :locale="localLanguage" :message="config" :size="size">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/stores/modules/global"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import en from "element-plus/lib/locale/lang/en"
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
