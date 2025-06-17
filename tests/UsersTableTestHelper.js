/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const UsersTableTestHelper = {
  async addUser({
    id = "user-123",
    name = "dicoding",
    email = "dicoding@mail.com",
    password = "secret",
    role = "buyer",
    status = "active",
    created_at = new Date(),
    updated_at = new Date(),
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [id, name, email, password, role, status, created_at, updated_at],
    };

    await pool.query(query);
  },

  async findUsersById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findUsersByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async updateUserStatus(email, status) {
    const query = {
      text: "UPDATE users SET status = $1 WHERE email = $2",
      values: [status, email],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query("DELETE FROM users WHERE 1=1");
  },
};

module.exports = UsersTableTestHelper;
