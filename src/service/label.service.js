const connection = require("../app/database")

class LableService {
  // 创建标签
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }
  // 获取标签列表
  async list() {
    const statement = `SELECT * FROM label;`
    const [result] = await connection.execute(statement)
    return result
  }
  // 查询是否包含标签
  async queryLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }
  // 查询动态是否添加了标签
  async queryLabelByMomentId(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
    // return result;
  }
  // 为动态添加标签
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new LableService()