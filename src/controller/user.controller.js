const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 获取用户的信息
    const user = ctx.request.body;

    // 存储到数据库 
    const result = await userService.create(user)

    // 查看存储结果，告诉前端存储成功
    ctx.body = {
      message: "用户创建成功",
      data: result
    }
  }
}
module.exports = new UserController();
