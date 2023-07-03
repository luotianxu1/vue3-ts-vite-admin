/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from "vue"
import Modal from "@utils/modal"

interface ElType extends HTMLElement {
	copyData: string | number
}

const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value
		el.addEventListener("click", handleClick)
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", handleClick)
	}
}

function handleClick(this: any) {
	const input = document.createElement("input")
	input.value = this.copyData.toLocaleString()
	document.body.appendChild(input)
	input.select()
	document.execCommand("Copy")
	document.body.removeChild(input)
	Modal.msgSuccess("复制成功！")
}

export default copy
