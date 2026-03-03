const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const momentController = require("../controller/moment.controller")
const { verifyPermission } = require("../middleware/permission.middleware")

const momentRouter = new KoaRouter({ prefix: "/moment" })

// 动态接口
// 1.发布动态(增)
momentRouter.post("/", verifyAuthor, momentController.create)
// 2.动态列表/详情(查)
momentRouter.get("/", momentController.list)
momentRouter.get("/:momentId", momentController.detail)
// 3.更新动态(改)
momentRouter.patch("/:momentId", verifyAuthor, verifyPermission, momentController.update)
// 4.删除动态(删)
momentRouter.delete("/:momentId", verifyAuthor, verifyPermission, momentController.remove)

module.exports = momentRouter