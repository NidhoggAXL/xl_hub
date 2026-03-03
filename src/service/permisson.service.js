const connection = require("../app/database");

class PermissionService {
  // 检查是否有mount的权限
  async checkMoment(momentId, id) {
    const statement = `SELECT * FROM moment m WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, id]);
    return !!result.length;
  }

  // 检查全部权限
  async check(table, checkId, id) {
    const statement = `SELECT * FROM ${table} m WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [checkId, id]);
    return !!result.length;
  }
}

module.exports = new PermissionService();
