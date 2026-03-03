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

  // 获取动态详情
  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.detail(momentId)
    ctx.body = {
      code: 0,
      data: result[0]
    }
  }

  // 修改动态
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.update(momentId, content)
    ctx.body = {
      code: 0,
      message: "修改动态成功",
      data: result
    }
  }

  // 删除动态
  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = {
      code: 0,
      message: "删除动态成功",
      data: result
    }
  }

}

module.exports = new MomentController();