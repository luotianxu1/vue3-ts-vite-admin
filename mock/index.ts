import type { MockMethod } from "vite-plugin-mock"
import { userApiList } from "./modules/user"
import { loginApiList } from "./modules/login"
import { departmentApiList } from "./modules/department"
import { dahboardApiList } from "./modules/dahboard"

export default [...loginApiList, ...userApiList, ...departmentApiList, ...dahboardApiList] as MockMethod[]
