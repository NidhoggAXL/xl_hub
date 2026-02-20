const connection = require("../app/database")


class PermissionService {
  async checkMount(momentId, id) {
    const statement = `SELECT * FROM moment m WHERE id = ? AND user_id = ?;`
    const isPermission = await connection.execute(statement, [momentId, id])
    return !!isPermission[0].length
  }
}

module.exports = new PermissionService()
