const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const momentController = require("../controller/moment.controller")

const momentRouter = new KoaRouter({ prefix: "/moment" })

// 动态接口
// 1.发布动态
momentRouter.post("/", verifyAuthor, momentController.create)
// 2.获取动
momentRouter.get("/", momentController.list)

module.exports = momentRouter