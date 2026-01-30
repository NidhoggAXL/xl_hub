const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const momentController = require("../controller/moment.controller")

const momentRouter = new KoaRouter({ prefix: "/moment" })

// 动态接口
momentRouter.post("/", verifyAuthor, momentController.create)


module.exports = momentRouter