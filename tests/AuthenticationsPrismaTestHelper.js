/* istanbul ignore file */
const prisma = require("../src/Infrastructures/database/prisma");

const AuthenticationsPrismaTestHelper = {
  async addToken(token) {
    await prisma.authentication.create({
      data: { token },
    });
  },

  async findToken(token) {
    const result = await prisma.authentication.findUnique({
      where: { token },
      select: { token: true },
    });

    return result ? [result] : [];
  },

  async cleanTable() {
    await prisma.authentication.deleteMany({});
  },
};

module.exports = AuthenticationsPrismaTestHelper;
