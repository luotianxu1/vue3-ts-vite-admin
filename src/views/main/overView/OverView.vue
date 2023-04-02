<template>
	<div class="user">
		<Search></Search>
		<Content></Content>
	</div>
</template>

<script lang="ts" setup>
import Search from "./components/Search.vue"
import Content from "./components/Content.vue"
</script>

<style lang="scss" scoped>
.user {
	padding: 20px;
	height: calc(100% - 40px);
}
</style>
