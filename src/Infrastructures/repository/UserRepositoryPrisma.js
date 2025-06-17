const InvariantError = require("../../Commons/exceptions/InvariantError");
const RegisteredUser = require("../../Domains/users/entities/RegisteredUser");
const UserRepository = require("../../Domains/users/UserRepository");

class UserRepositoryPrisma extends UserRepository {
  constructor(prisma, idGenerator) {
    super();
    this._prisma = prisma;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableEmail(email) {
    const user = await this._prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new InvariantError(
        "tidak dapat membuat user baru karena email tidak tersedia"
      );
    }
  }

  async addUser(registerUser) {
    const { name, email, password, role } = registerUser;
    const id = `user-${this._idGenerator()}`;
    const status = "active";

    const result = await this._prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
        role,
        status,
      },
    });

    return new RegisteredUser({ ...result });
  }

  async getPasswordByEmail(email) {
    const result = await this._prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });

    if (!result) {
      throw new InvariantError("email tidak ditemukan");
    }

    return result.password;
  }

  async getIdByEmail(email) {
    const result = await this._prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!result) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result.id;
  }

  async getUserStatus(userId) {
    const result = await this._prisma.user.findUnique({
      where: { id: userId },
      select: { status: true },
    });

    if (!result) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result.status;
  }

  async getUserById(userId) {
    const result = await this._prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!result) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result;
  }

  async getAllUsers() {
    const results = await this._prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return results.map((result) => new RegisteredUser({ ...result }));
  }

  async updateUser(id, updatedUser) {
    const { name, email, role } = updatedUser;

    const result = await this._prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return new RegisteredUser({ ...result });
  }

  async deleteUser(id) {
    try {
      await this._prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new InvariantError("user tidak ditemukan");
    }
  }

  async updateUserStatus(userId, status) {
    const validStatuses = ["active", "suspended", "banned"];
    if (!validStatuses.includes(status)) {
      throw new InvariantError("status tidak valid");
    }

    try {
      await this._prisma.user.update({
        where: { id: userId },
        data: { status },
      });
    } catch (error) {
      throw new InvariantError("user tidak ditemukan");
    }
  }
}

module.exports = UserRepositoryPrisma;
