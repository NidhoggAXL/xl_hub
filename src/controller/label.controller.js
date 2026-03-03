const LabelService = require("../service/label.service")

class LableController {
  // 创建标签
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await LabelService.create(name)
    ctx.body = {
      code: 0,
      message: "创建标签成功",
      data: result
    }
  }

  // 获取标签列表
  async list(ctx, next) {
    const result = await LabelService.list()
    ctx.body = {
      code: 0,
      message: "获取标签列表成功",
      data: result
    }
  }

  // 动态添加标签
  async addLabel(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    for (const label of labels) {
      // 确认数据库是否包含了动态和标签的对应
      const isExists = await LabelService.queryLabelByMomentId(momentId, label.id)
      if (!isExists) {
        // 为动态添加标签
        const result = await LabelService.addLabel(momentId, label.id)
      }
    }  
    ctx.body = {
      code: 0,
      message: "添加标签成功"
    }
  }
}

module.exports = new LableController();