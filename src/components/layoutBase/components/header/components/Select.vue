<template>
	<div class="header-search" :class="{ show: isShow }">
		<el-tooltip content="搜索" placement="bottom" effect="light">
			<i class="iconfont icon-search" @click="showSearch"></i>
		</el-tooltip>
		<el-select
			class="header-search-select"
			ref="headerSearchRef"
			v-model="search"
			filterable
			remote
			placeholder="搜索"
			@change="onSelectChange"
		>
			<el-option v-for="item in menuList" :key="item.path" :label="item.meta.title" :value="item.path">
				{{ item.meta.title }}
			</el-option>
		</el-select>
	</div>
</template>

<script lang="ts" setup>
import router from "@/router/index"
import type { RouteLocationRaw } from "vue-router"
import { UserStore } from "@/stores/modules/user"

const headerSearchRef = ref()
const isShow = ref(false)
const showSearch = () => {
	isShow.value = !isShow.value
	isShow.value && headerSearchRef.value.focus()
}

const search = ref("")
const userStore = UserStore()
const menuList = computed(() => userStore.flatMenuListGet.filter(item => !item.meta.isHide && item.component))

const onSelectChange = (path: RouteLocationRaw) => {
	router.push(path)
	isShow.value = false
	search.value = ""
	headerSearchRef.value.blur()
}
</script>
<style lang="scss" scoped>
.header-search {
	font-size: 0 !important;

	i {
		font-size: 20px;
		vertical-align: middle;
		cursor: pointer;

		&:hover {
			color: var(--el-color-primary);
		}
	}

	.header-search-select {
		display: inline-block;
		width: 0;
		overflow: hidden;
		font-size: 18px;
		vertical-align: middle;
		background: transparent;
		border-radius: 0;
		transition: width 0.2s;
	}

	::v-deep(.el-select .el-input .el-input__wrapper),
	::v-deep(.el-select .el-input.is-focus .el-input__wrapper) {
		padding-right: 0;
		padding-left: 0;
		vertical-align: middle;
		border: 0;
		border-bottom: 1px solid #d9d9d9;
		border-radius: 0;
		box-shadow: none !important;
	}
}

.show {
	.header-search-select {
		width: 210px;
		margin-left: 10px;
	}
}
</style>
