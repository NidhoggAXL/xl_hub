const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {verifyUser, handlePassword} = require("../middleware/user.middleware");

// 创建路由对象
const useRouter = new KoaRouter({ prefix: "/users" });

// 定义路由映射表
// 1.用户注册接口 verify-校验 多个中间件
//  verifyUser-校验用户名和密码
//  handlePassword-加密操作
//  userController-控制相关的操作
useRouter.post("/", verifyUser, handlePassword, userController.create);

// 导出路由对象
module.exports = useRouter;
