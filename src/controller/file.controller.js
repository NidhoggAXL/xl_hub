const fs = require("fs")
const fileService = require("../service/file.service");
const { UPLOAD_PATCH } = require("../config/path");
const { SERVER_PROT, SERVER_HOST} = require("../config/server")

class FileMiddleware {
  // 上传头像
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    // 上传头像到头像表中
    const result = await fileService.create(filename, mimetype, size, id);
    // 更新用户表中的头像url
    const avatarUrl = `${SERVER_HOST}:${SERVER_PROT}/file/avatar/${id}`
    const result2 = await fileService.uploadAvatarUrl(avatarUrl, id)
    ctx.body = {
      code: 0,
      message: "上传头像成功",
      data: avatarUrl,
    };
  }
  // 获取头像
  async getAvatar(ctx, next) { 
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatar(userId)
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATCH}/${filename}`)
  }
}

module.exports = new FileMiddleware();
