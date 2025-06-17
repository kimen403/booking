const AuthenticationRepository = require("../../Domains/authentications/AuthenticationRepository");

class AuthenticationRepositoryPrisma extends AuthenticationRepository {
  constructor(prisma) {
    super();
    this._prisma = prisma;
  }

  async addToken(token) {
    await this._prisma.authentication.create({
      data: { token },
    });
  }

  async checkAvailabilityToken(token) {
    const result = await this._prisma.authentication.findUnique({
      where: { token },
    });
    return !!result;
  }

  async deleteToken(token) {
    await this._prisma.authentication.delete({
      where: { token },
    });
  }
}

module.exports = AuthenticationRepositoryPrisma;
