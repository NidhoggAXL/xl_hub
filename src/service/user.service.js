const connection = require("../app/database");

class UserService {
  // 创建用户
  async create(user) {
    // 获取用户信息
    const { name, password } = user
    
    // 预编译SQL语句
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'

    // 执行SQL语句
    const [result] = await connection.execute(statement, [name, password])

    // 返回结果
    return result
  }

  // 判断是否存在用户
  async getUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [result] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new UserService();