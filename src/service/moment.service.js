const connection = require("../app/database");

class MomentService {
    // 发布动态
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
 
  // 获取动态
  // 使用解构来设置默认值
  async list({ limit = "0", offset = "10" } = query) {
    // console.log(limit, offset);
    const statement = `
      SELECT 
        m.id id, m.content, m.createAt createTime, m.updateAt updataTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updataTime', u.updateAt) user
      FROM moment m LEFT JOIN user u ON u.id = m.user_id
      LIMIT ?,?;
    `;
    const [result] = await connection.execute(statement, [limit, offset]);
    return result;
  }

  // 获取动态详情
  async detail(id) {
    const statement = `
      SELECT 
        m.id id, m.content, m.createAt createTime, m.updateAt updataTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updataTime', u.updateAt) user
      FROM moment m LEFT JOIN user u ON u.id = m.user_id
      WHERE m.id = ?;
    `
    const result = await connection.execute(statement, [id])   
    return result[0]
  }

  // 修改动态
  async update(id, content) {
    const statement = `
      UPDATE moment SET content = ? WHERE id = ?;
    `
    const result = await connection.execute(statement, [content, id])
    return result[0]
  }

  // 删除动态
  async remove(id) {
    const statement = `
      DELETE FROM moment WHERE id = ?;
    `
    const result = await connection.execute(statement, [id])
    return result[0]
  }
}

module.exports = new MomentService();
