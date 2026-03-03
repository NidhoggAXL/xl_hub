const { PERMISSION_IS_NOT_ALLOW } = require("../config/error");
const permissonService = require("../service/permisson.service");

// 验证用户是否有操作moment的权限
// const verifyMomentPermission = async (ctx, next) => {
//   const { momentId } = ctx.params;
//   const { id } = ctx.user;
//   console.log(id)
//   const isPermission = await permissonService.checkMoment(momentId, id)
//   if (!isPermission) {
//     return ctx.app.emit("error", PERMISSION_IS_NOT_ALLOW, ctx)
//   }
//   await next()
// };

// module.exports = {
//   verifyMomentPermission,
// };

const verifyPermission = async (ctx, next) => {
  const keyName = Object.keys(ctx.params)[0]; //  从上下文参数中获取第一个键名
  const resourseId = ctx.params[keyName]; //  获取URL参数中指定键名的资源ID
  const resourseName = keyName.replace("Id", "");
  //  将键名中的"Id"替换为空字符串，得到资源名称 例如：如果keyName是"userId"，则替换后为"user"
  const { id } = ctx.user;
  const isPermission = await permissonService.check(
    resourseName,
    resourseId,
    id,
  );
  if (!isPermission) {
    return ctx.app.emit("error", PERMISSION_IS_NOT_ALLOW, ctx);
  }
  await next();
};

module.exports = {
  verifyPermission,
};
