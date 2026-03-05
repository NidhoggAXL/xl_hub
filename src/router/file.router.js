const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const { handleAvatar } = require("../middleware/file.middleware")
const fileController = require("../controller/file.controller")

const fileRouter = new KoaRouter({ prefix: "/file" })

// 头像上传
fileRouter.post("/avatar", verifyAuthor, handleAvatar, fileController.create)
// 头像获取
fileRouter.get("/avatar/:userId", fileController.getAvatar)

module.exports = fileRouter