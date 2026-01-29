// 导入app和其他数据
const app = require("./app/index")
const { SERVER_PROT } = require("./config/server")
require("./utils/handle-error")

// 启动app服务 
app.listen(SERVER_PROT, () => {
  console.log("Koa服务器启动成功")
})