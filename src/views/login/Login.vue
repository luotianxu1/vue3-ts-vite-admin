<template>
	<div class="login">
		<div class="login-box">
			<div class="left">
				<div class="company">业务管理信息系统平台</div>
				<img class="img" src="../../assets/svg/login.svg" />
			</div>
			<div class="form">
				<div class="title">用户登陆</div>
				<el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="0">
					<el-form-item prop="name">
						<el-input v-model="form.name" class="input" size="large" placeholder="请输入用户名" :prefix-icon="User" />
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="form.password"
							class="input"
							size="large"
							placeholder="请输入登录密码"
							:prefix-icon="Unlock"
							type="password"
							show-password
						/>
					</el-form-item>
					<el-form-item prop="code">
						<el-input v-model="form.code" class="input-code" size="large" placeholder="请输入右侧校验码" :prefix-icon="Key" />
						<CodeBox ref="checkBoxRef"></CodeBox>
					</el-form-item>
					<el-form-item>
						<div class="password">
							<el-checkbox v-model="form.remember">记住密码</el-checkbox>
							<el-button type="primary" link>忘记密码？</el-button>
						</div>
					</el-form-item>
					<el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">登陆</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { User, Unlock, Key } from "@element-plus/icons-vue"
import type { FormInstance, FormRules } from "element-plus"
import CodeBox from "./components/CodeBox.vue"
import { UserStore } from "@/stores/modules/user"
import { localCache } from "@/utils/cache"
import { CACHE_NAME, CACHE_PASSWORD } from "@/global/constants"
import Modal from "@utils/modal"

// 校验码
const checkBoxRef = ref<InstanceType<typeof CodeBox>>()
// checkBoxRef.value?.checkBox()

// 表单
const ruleFormRef = ref<FormInstance>()
const form = reactive({
	name: localCache.getCache(CACHE_NAME) ?? "",
	password: localCache.getCache(CACHE_PASSWORD) ?? "",
	code: "",
	remember: localCache.getCache(CACHE_NAME) ? true : false
})
const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{ min: 3, max: 5, message: "用户名长度应在3至5位内", trigger: "blur" }
	],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	code: [{ required: true, message: "请输入右侧校验码", trigger: "blur" }]
})

// 提交表单
const userStore = UserStore()
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate(valid => {
		if (valid) {
			userStore.loginAccountAction(
				{
					name: form.name,
					password: form.password
				},
				form.remember
			)
		} else {
			Modal.msgWarning("请输入完整表单")
		}
	})
}
</script>

<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	background-image: url("../../assets/svg/login-base.svg");
	background-position: right top;
	background-repeat: no-repeat;
	background-attachment: scroll;
	background-size: cover;
	background-origin: border-box;
	color: #666666;

	.login-box {
		width: 800px;
		height: 540px;
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 5px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.149019607843137);

		.left {
			position: relative;
			display: flex;
			justify-content: center;

			.company {
				position: absolute;
				top: 0;
				font-weight: 700;
				font-size: 20px;
				margin-top: 80px;
			}
		}

		.form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 40px 40px 100px 40px;
			font-size: 18px;

			.title {
				font-weight: 700;
			}

			.input {
				width: 380px;
				height: 50px;
			}

			.input-code {
				width: 270px;
				height: 50px;
			}

			.password {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.btn {
				width: 380px;
				height: 50px;
			}
		}
	}
}
</style>
