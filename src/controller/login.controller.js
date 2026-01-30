const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/key");

class LoginController {
  // 登录控制
  sign(ctx, next) {
    // 1.生成token
    const { id, name } = ctx.user;

    // 2.颁发令牌token
    let token = "";
    try {
      token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: "RS256",
      });
    } catch (error) {
      console.log(error);
    }

    // 返回登录获取到的token
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }
}

module.exports = new LoginController();
