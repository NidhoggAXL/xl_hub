const connection = require("../app/database");

class MomentService {
  // 发布动态
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  // 获取动态列表
  // 使用解构来设置默认值
  async list({ limit = "0", offset = "10" } = query) {
    // console.log(limit, offset);
    const statement = `
      SELECT 
        m.id id, m.content, m.createAt createTime, m.updateAt updataTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updataTime', u.updateAt) user,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) as commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) as labelCount 
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
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updataTime', u.updateAt) user,
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'id', c.id, 'content', c.content, 'commentId', c.comment_id,
                'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url)
              )
            )
          FROM comment c
          LEFT JOIN user cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) as comments,
        JSON_ARRAYAGG(
          IF(l.id IS NULL AND l.name IS NULL,NULL,
            JSON_OBJECT(
              'id', l.id, 'name', l.name
            )
          )
        ) as labels
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  // 修改动态
  async update(id, content) {
    const statement = `
      UPDATE moment SET content = ? WHERE id = ?;
    `;
    const result = await connection.execute(statement, [content, id]);
    return result[0];
  }

  // 删除动态
  async remove(id) {
    const statement = `
      DELETE FROM moment WHERE id = ?;
    `;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new MomentService();
