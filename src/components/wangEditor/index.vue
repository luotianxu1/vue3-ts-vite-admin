<template>
	<div :class="['editor-box', self_disabled ? 'editor-disabled' : '']">
		<Toolbar class="editor-toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
		<Editor v-model="valueHtml" :style="{ height }" :default-config="editorConfig" :mode="mode" @onCreated="handleCreated" />
	</div>
</template>
<!-- https://www.wangeditor.com/ -->
<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { i18nChangeLanguage } from "@wangeditor/editor"
import type { IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
// import { formContextKey, formItemContextKey } from "element-plus"

i18nChangeLanguage("zh-CN")

// 接收父组件参数，并设置默认值
interface RichEditorProps {
	value: string // 富文本值 ==> 必传
	toolbarConfig?: Partial<IToolbarConfig> // 工具栏配置 ==> 非必传（默认为空）
	editorConfig?: Partial<IEditorConfig> // 编辑器配置 ==> 非必传（默认为空）
	height?: string // 富文本高度 ==> 非必传（默认为 500px）
	mode?: "default" | "simple" // 富文本模式 ==> 非必传（默认为 default）
	disabled?: boolean // 是否禁用编辑器 ==> 非必传（默认为false）
}

const props = withDefaults(defineProps<RichEditorProps>(), {
	toolbarConfig: () => {
		return {
			excludeKeys: []
		}
	},
	editorConfig: () => {
		return {
			placeholder: "请输入内容...",
			MENU_CONF: {
				codeSelectLang: {
					codeLangs: [
						{ text: "CSS", value: "css" },
						{ text: "HTML", value: "html" },
						{ text: "XML", value: "xml" }
					]
				}
			}
		}
	},
	height: "500px",
	mode: "default",
	disabled: false
})

// 富文本 DOM 元素
const editorRef = shallowRef()
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
	return props.disabled
})

// 判断当前富文本编辑器是否禁用
if (self_disabled.value) nextTick(() => editorRef.value.disable())

// 实列化编辑器
const handleCreated = (editor: any) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

// 富文本的内容监听，触发父组件改变，实现双向数据绑定
type EmitProps = {
	(e: "update:value", val: string): void
	(e: "check-validate"): void
}
const emit = defineEmits<EmitProps>()
const valueHtml = computed({
	get() {
		return props.value
	},
	set(val: string) {
		// 防止富文本内容为空时，校验失败
		if (editorRef.value.isEmpty()) val = ""
		emit("update:value", val)
	}
})

// const toolbarConfig: Partial<IToolbarConfig> = {
// 	toolbarKeys: [
// 		// 菜单 key
// 		"headerSelect",
// 		// 分割线
// 		"|",
// 		// 菜单 key
// 		"bold",
// 		"italic",
// 		// 菜单组，包含多个菜单
// 		{
// 			key: "group-more-style", // 必填，要以 group 开头
// 			title: "更多样式", // 必填
// 			iconSvg: "<svg>....</svg>", // 可选
// 			menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
// 		}
// 	]
// }

// 图片上传前判断
const uploadImgValidate = (file: File): boolean => {
	console.log(file)
	return true
}

/**
 * @description 图片自定义上传
 * @param file 上传的文件
 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
 * */
type InsertFnTypeImg = (url: string, alt?: string, href?: string) => void
props.editorConfig.MENU_CONF!["uploadImage"] = {
	async customUpload(file: File, insertFn: InsertFnTypeImg) {
		if (!uploadImgValidate(file)) return
		let formData = new FormData()
		formData.append("file", file)
		console.log(formData)
		try {
			// const { data } = await uploadImg(formData)
			// insertFn(data.fileUrl)
		} catch (error) {
			console.log(error)
		}
	}
}

// 视频上传前判断
const uploadVideoValidate = (file: File): boolean => {
	console.log(file)
	return true
}

/**
 * @description 视频自定义上传
 * @param file 上传的文件
 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
 * */
type InsertFnTypeVideo = (url: string, poster?: string) => void
props.editorConfig.MENU_CONF!["uploadVideo"] = {
	async customUpload(file: File, insertFn: InsertFnTypeVideo) {
		if (!uploadVideoValidate(file)) return
		let formData = new FormData()
		formData.append("file", file)
		try {
			// const { data } = await uploadVideo(formData);
			// insertFn(data.fileUrl);
		} catch (error) {
			console.log(error)
		}
	}
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	if (!editorRef.value) return
	editorRef.value.destroy()
})

defineExpose({
	editor: editorRef
})
</script>

<style scoped lang="scss">
.editor-toolbar {
	border-bottom: 1px solid #ccc;
}

/* 富文本组件禁用样式 */
.editor-disabled {
	cursor: not-allowed !important;
}

/* 富文本组件样式 */
.editor-box {
	/* 防止富文本编辑器全屏时 tabs组件 在其层级之上 */
	z-index: 2;
	width: 100%;
	border: 1px solid #cccccc;
	.editor-toolbar {
		border-bottom: 1px solid #cccccc;
	}
	.editor-content {
		overflow-y: hidden;
	}
}
</style>
