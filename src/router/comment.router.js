const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const commentController = require("../controller/comment.controller")

const commentRouter = new KoaRouter({ prefix: "/comment" })

// 增
// 新增评论
commentRouter.post("/", verifyAuthor, commentController.create)
// 回复评论
commentRouter.post("/reply", verifyAuthor, commentController.reply)

module.exports = commentRouter