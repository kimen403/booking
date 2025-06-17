/* istanbul ignore file */
const prisma = require("../src/Infrastructures/database/prisma");

const UsersPrismaTestHelper = {
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
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
        role,
        status,
        created_at,
        updated_at,
      },
    });
  },

  async findUsersById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? [user] : [];
  },

  async findUsersByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? [user] : [];
  },

  async updateUserStatus(email, status) {
    await prisma.user.update({
      where: { email },
      data: { status },
    });
  },

  async cleanTable() {
    await prisma.user.deleteMany({});
  },
};

module.exports = UsersPrismaTestHelper;
