const { PERMISSION_IS_NOT_ALLOW } = require("../config/error");
const permissonService = require("../service/permisson.service");


// 验证权限
const verifyMomentPermission = async (ctx, next) => {
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  const isPermission = await permissonService.checkMount(momentId, id) 
  if (!isPermission) {
    return ctx.app.emit("error", PERMISSION_IS_NOT_ALLOW, ctx)
  }
  await next()
};

module.exports = {
  verifyMomentPermission,
};
