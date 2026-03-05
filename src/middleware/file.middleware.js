const multer = require("@koa/multer")

// 定义文件上传中间件
const uploadAvatar = multer({
  // diskStorage-磁盘存储
  storage: multer.diskStorage({
    // 文件存储路径
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    // 文件重命名
    filename: (req, file, callback) => {
      // 时间戳 + 原始文件名(存在后缀)
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

const handleAvatar = uploadAvatar.single("avatar")

module.exports = {
  handleAvatar
}