/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。

  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上

  使用：给 Dom 加上 v-throttle 及回调函数即可
  <button v-throttle="debounceClick">节流提交</button>
*/
import type { Directive, DirectiveBinding } from "vue"
import Modal from "@utils/modal"

interface ElType extends HTMLElement {
	handleClick: () => any
	disabled: boolean
}
const throttle: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		if (typeof binding.value !== "function") {
			throw Modal.msgWarning("请绑定函数！")
		}
		let timer: any = null
		el.handleClick = function () {
			if (timer) {
				clearTimeout(timer)
			}
			if (!el.disabled) {
				el.disabled = true
				binding.value()
				timer = setTimeout(() => {
					el.disabled = false
				}, 1000)
			}
		}
		el.addEventListener("click", el.handleClick)
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.handleClick)
	}
}

export default throttle
