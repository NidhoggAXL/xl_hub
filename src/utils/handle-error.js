const app = require("../app/index");
const {
  NAME_OR_PASSWORD_NOT_NULL,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");

// 监听app的error事件
app.on("error", (err, ctx) => {
  let code = 0;
  let message = "";
  switch (err) {
    case NAME_OR_PASSWORD_NOT_NULL:
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经被占用，请重新选择用户名！";
  }
  ctx.body = {
    code,
    message,
  };
});
