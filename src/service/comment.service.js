const connection = require("../app/database");

class CommentService {
  async create(comment, momentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      comment,
      momentId,
      userId,
    ]);
    return result;
  }
  async reply(content, momentId, commmentId, userId) {
    const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commmentId,
      userId,
    ]);
    return result;
  }
}

module.exports = new CommentService();
