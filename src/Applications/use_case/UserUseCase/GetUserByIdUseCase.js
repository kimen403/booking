const DetailUser = require("../../../Domains/users/entities/DetailUser");

class GetUserByIdUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this._userRepository.getUserById(userId);
    return new DetailUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  }
}

module.exports = GetUserByIdUseCase;
