const connection = require("../app/database");

class FileService {
  // 上传文件
  async create(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
  // 查看头像
  async getAvatar(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }
  // 更新用户表中的头像
  async uploadAvatarUrl(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new FileService();
