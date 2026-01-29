const Koa = require('koa');
const bodyParser = require("koa-bodyparser")
const useRouter = require("../router/user.router")

// 创建app
const app = new Koa();

// 使用中间件
app.use(bodyParser())
app.use(useRouter.routes())
app.use(useRouter.allowedMethods())

// 将app导出
module.exports = app