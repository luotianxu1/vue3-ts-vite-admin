v
<template>
	<div class="content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary">新建用户</el-button>
		</div>
		<div class="table">表格</div>
		<div class="pagination">分页</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.content {
	padding: 20px;
	background-color: #fff;
	margin-top: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.title {
	font-size: 22px;
}
</style>
