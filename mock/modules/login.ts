import type { MockMethod } from "vite-plugin-mock"

export const loginApiList: MockMethod[] = [
	// 用户登陆
	{
		url: "/testApi/login",
		method: "post",
		response: (data: any) => {
			const res = data.body
			if (res.name === "admin") {
				return {
					status: 200,
					message: "登陆成功！",
					data: {
						id: "@guid",
						name: "admin",
						token: "@guid"
					}
				}
			} else {
				return {
					status: 500,
					message: "登陆失败！",
					data: {}
				}
			}
		}
	},
	// 用户信息
	{
		url: "/testApi/users",
		method: "post",
		response: (data: any) => {
			const res = data.body
			return {
				status: 200,
				message: "查询成功！",
				data: {
					id: "1",
					name: "admin",
					cellphone: 15122061897,
					enable: 1,
					img: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
					createTime: "2023-04-01 14:30:20",
					updateTime: "2023-04-01 14:30:20",
					role: {
						id: 1,
						name: "超级管理员",
						intro: "所有权限"
					},
					department: {
						id: 1,
						name: "总裁办",
						parentId: null,
						leader: null
					}
				}
			}
		}
	},
	// 用户菜单
	{
		url: "/testApi/menu",
		method: "post",
		response: (data: any) => {
			const res = data.body
			return {
				status: 200,
				message: "查询成功！",
				data: {
					list: [
						{
							path: "/dashborad",
							name: "dashborad",
							component: "/main/dashboard/Dashboard",
							meta: {
								title: "首页",
								icon: "icon-baobiao",
								isFull: false,
								isHide: false,
								isKeepAlive: false
							}
						},
						{
							path: "/screen",
							name: "screen",
							component: "/screen/Screen",
							meta: {
								title: "大屏",
								icon: "icon-baobiao",
								isFull: true,
								isHide: false,
								isKeepAlive: false
							}
						},
						{
							path: "/main",
							name: "main",
							redirect: "/main/user",
							meta: {
								title: "系统管理",
								icon: "icon-setting",
								isFull: true,
								isHide: false
							},
							children: [
								{
									path: "/main/user",
									name: "user",
									component: "/main/user/User",
									meta: {
										title: "用户管理",
										icon: "icon-yonghu",
										isFull: false,
										isHide: false,
										isKeepAlive: true
									},
									children: [
										{
											title: "新增",
											permission: "system:user:create"
										}
									]
								},
								{
									path: "/main/menu",
									name: "userMenu",
									component: "/main/menu/Menu",
									meta: {
										title: "菜单管理",
										icon: "icon-caidan",
										isFull: false,
										isHide: false,
										isKeepAlive: true
									},
									children: [
										{
											title: "修改",
											permission: "system:menus:edit"
										}
									]
								}
							]
						},
						{
							path: "/directives",
							name: "directives",
							redirect: "/directives/copyDirect",
							meta: {
								title: "自定义指令",
								icon: "icon-bianji",
								isFull: false,
								isHide: false
							},
							children: [
								{
									path: "/directives/copyDirect",
									name: "copyDirect",
									component: "/directives/copyDirect/CopyDirect",
									meta: {
										title: "复制指令",
										icon: "icon-fuzhi",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/directives/watermarkDirect",
									name: "watermarkDirect",
									component: "/directives/watermarkDirect/WatermarkDirect",
									meta: {
										title: "水印指令",
										icon: "icon-shuiyin",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/directives/dragDirect",
									name: "dragDirect",
									component: "/directives/dragDirect/DragDirect",
									meta: {
										title: "拖拽指令",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/directives/debounceDirect",
									name: "debounceDirect",
									component: "/directives/debounceDirect/DebounceDirect",
									meta: {
										title: "防抖指令",
										icon: "icon-shaixuan",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/directives/throttleDirect",
									name: "throttleDirect",
									component: "/directives/throttleDirect/ThrottleDirect",
									meta: {
										title: "节流指令",
										icon: "icon-shaixuan",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/directives/longpressDirect",
									name: "longpressDirect",
									component: "/directives/longpressDirect/LongpressDirect",
									meta: {
										title: "长按指令",
										icon: "icon-changan",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								}
							]
						},
						{
							path: "/function",
							name: "function",
							redirect: "/function/guide",
							meta: {
								title: "常用功能",
								icon: "icon-gongnengdingyi",
								isFull: false,
								isHide: false
							},
							children: [
								{
									path: "/function/guide",
									name: "guide",
									component: "/function/guide/Guide",
									meta: {
										title: "引导页",
										icon: "icon-xinshouyindao",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/svg",
									name: "svg",
									component: "/function/svg/Svg",
									meta: {
										title: "SVG图标",
										icon: "icon-svg",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/editor",
									name: "wangEditor",
									component: "/function/editor/Editor",
									meta: {
										title: "富文本编辑器",
										icon: "icon-markdown",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/draggable",
									name: "draggable",
									component: "/function/draggable/Draggable",
									meta: {
										title: "拖拽",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								},
								{
									path: "/function/embedded",
									name: "embedded",
									component: "/function/embedded/Embedded",
									meta: {
										title: "嵌套页面",
										icon: "icon-kaifazhong",
										isFull: false,
										isHide: false,
										isKeepAlive: false
									}
								}
							]
						}
					]
				}
			}
		}
	}
]
