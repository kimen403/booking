const InvariantError = require("../../Commons/exceptions/InvariantError");
const RegisteredUser = require("../../Domains/users/entities/RegisteredUser");
const UserRepository = require("../../Domains/users/UserRepository");

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError(
        "tidak dapat membuat user baru karena email tidak tersedia"
      );
    }
  }

  async addUser(registerUser) {
    const { name, email, password, role } = registerUser;
    const id = `user-${this._idGenerator()}`;
    const status = "active";
    const created_at = new Date();
    const updated_at = created_at;

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, role, status, created_at, updated_at",
      values: [id, name, email, password, role, status, created_at, updated_at],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  async getPasswordByEmail(email) {
    const query = {
      text: "SELECT password FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("email tidak ditemukan");
    }

    return result.rows[0].password;
  }

  async getIdByEmail(email) {
    const query = {
      text: "SELECT id FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    const { id } = result.rows[0];

    return id;
  }

  async getUserStatus(userId) {
    const query = {
      text: "SELECT status FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result.rows[0].status;
  }

  async getUserById(userId) {
    const query = {
      text: "SELECT id, name, email, role, status, created_at, updated_at FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result.rows[0];
  }

  async getAllUsers() {
    const query = {
      text: "SELECT id, name, email, role, status, created_at, updated_at FROM users",
    };

    const result = await this._pool.query(query);
    return result.rows.map((row) => new RegisteredUser({ ...row }));
  }

  async updateUser(id, updatedUser) {
    const { name, email, role } = updatedUser;
    const updated_at = new Date();
    const query = {
      text: "UPDATE users SET name = $1, email = $2, role = $3, updated_at = $4 WHERE id = $5 RETURNING id, name, email, role, status, created_at, updated_at",
      values: [name, email, role, updated_at, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    return new RegisteredUser({ ...result.rows[0] });
  }

  async deleteUser(id) {
    const query = {
      text: "DELETE FROM users WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }
  }

  async updateUserStatus(userId, status) {
    console.log("updateUserStatus", userId, status);
    const validStatuses = ["active", "suspended", "banned"];
    if (!validStatuses.includes(status)) {
      throw new InvariantError("status tidak valid");
    }

    const query = {
      text: "UPDATE users SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id",
      values: [status, new Date(), userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }
  }
}

module.exports = UserRepositoryPostgres;
