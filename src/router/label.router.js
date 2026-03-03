const KoaRouter = require("@koa/router")
const { verifyAuthor } = require("../middleware/login.middleware")
const lableController = require("../controller/label.controller")

const lableRouter = new KoaRouter({ prefix: '/label' })

lableRouter.post("/", verifyAuthor, lableController.create)
lableRouter.get("/", lableController.list)

module.exports = lableRouter