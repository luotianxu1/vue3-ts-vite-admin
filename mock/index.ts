import mockjs from "mockjs"
import type { MockMethod } from "vite-plugin-mock"
import { userApiList } from "./modules/user"
import { loginApiList } from "./modules/login"
import { departmentApiList } from "./modules/department"
import { dahboardApiList } from "./modules/dahboard"

mockjs.Random.extend({
	phone: function () {
		const phonePrefixs = ["132", "135", "189"] // 自己写前缀哈
		return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/) //Number()
	}
})

export default [...loginApiList, ...userApiList, ...departmentApiList, ...dahboardApiList] as MockMethod[]
