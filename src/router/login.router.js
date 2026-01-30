const KoaRouter = require("@koa/router");
const loginController = require("../controller/login.controller");
const { verifyLogin, verifyAuthor } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 登录接口
loginRouter.post("/", verifyLogin, loginController.sign);

// 获取到token，测试接口
loginRouter.get("/demo", verifyAuthor)

module.exports = loginRouter;
