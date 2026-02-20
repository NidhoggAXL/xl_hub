const jwt = require("jsonwebtoken");

const {
  NAME_OR_PASSWORD_NOT_NULL,
  PASSWORD_IS_MISTAKE,
  NAME_IS_MISTAKE,
  TOKEN_IS_NULL,
} = require("../config/error");
const userService = require("../service/user.service");
const md5Password = require("../utils/md5-password");
const { PUBLIC_KEY } = require("../config/key");

// 验证是否登录
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 1.检验用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_NOT_NULL, ctx);
  }

  // 2.检验用户名和密码是否正确
  const users = await userService.getUserByName(name);
  // 校验用户名
  if (!users.length) {
    return ctx.app.emit("error", NAME_IS_MISTAKE, ctx);
  }
  // 校验密码
  if (users[0].password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_MISTAKE, ctx);
  }

  // 3.将用户信息存储到ctx中
  ctx.user = users[0];

  // 执行下一个中间件
  await next();
};

// 验证是否获取正确token
const verifyAuthor = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", TOKEN_IS_NULL, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 验证token
  try {
    // 获取token中的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      // 校验是数组，可以多种方式验证
      algorithms: ["RS256"],
    });

    // 将token中的信息存储到ctx中
    // { id: 13, name: 'aabb', iat: 1771565099, exp: 1771651499 }
    ctx.user = result;
    // ctx.body = 'yanddd'
    // 执行下一个中间件
    await next();
  } catch (error) {
    // 返回错误信息
    return ctx.app.emit("error", TOKEN_IS_NULL, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuthor,
};
