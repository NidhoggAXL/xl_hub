const { NAME_IS_ALREADY_EXISTS, NAME_OR_PASSWORD_NOT_NULL } = require("../config/error");
const userService = require("../service/user.service");
const md5Password = require("../utils/md5-password");

// 用户名和密码校验
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 校验名字和密码不为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_NOT_NULL, ctx)
  }

  // 查询数据库是否存在相同的用户名（用户名是否注册过）
  const result = await userService.getUserByName(name)
  if (result.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx)
  }

  // 执行下一个中间件
  await next();
}

// 加密操作
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}