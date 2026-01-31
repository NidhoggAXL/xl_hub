const momentService = require("../service/moment.service");

class MomentController {
  // 发布动态
  async create(ctx, next) {
    // 获取用户信息
    const { id } = ctx.user

    // 获取动态内容
    const { content } = ctx.request.body
    
    // 将动态存储到数据库中
    const result = await momentService.create(content, id)
    ctx.body = {
      code: 0,
      message: "发布动态成功",
      data: result
    }
  }

  // 获取动态
  async list(ctx, next) {
    const query = ctx.request.query
    const result = await momentService.list(query)
    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new MomentController();