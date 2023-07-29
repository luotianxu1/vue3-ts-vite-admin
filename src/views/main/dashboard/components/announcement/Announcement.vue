<template>
	<Card title="公告">
		<template #sub>
			<span class="placeholder link">详情</span>
		</template>
		<el-scrollbar>
			<div v-for="(item, index) in props.announcementData" :key="index" class="message">
				<div class="message-left ellipsis">
					<el-tag :type="item.type === 1 ? 'success' : item.type === 2 ? 'warning' : 'danger'">
						{{ item.type === 1 ? "系统" : item.type === 2 ? "消息" : "提醒" }}
					</el-tag>
					<span>{{ item.content }}</span>
				</div>
				<div class="placeholder">{{ item.time }}</div>
			</div>
		</el-scrollbar>
	</Card>
</template>

<script lang="ts" setup>
import type { IAnnouncementDataItem } from "@/types/modules/dashboard"
import Card from "@components/card/Card.vue"

interface IProps {
	announcementData: IAnnouncementDataItem[]
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.message {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.message-left {
		max-width: 70%;

		> span {
			&:nth-child(2) {
				margin-left: 10px;
			}
		}
	}
}
</style>
