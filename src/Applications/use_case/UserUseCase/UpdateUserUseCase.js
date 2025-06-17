const UpdateUser = require("../../../Domains/users/entities/UpdateUser");

class UpdateUserUseCase {
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(userId, payload) {
    const updateUser = new UpdateUser(payload);
    await this._userRepository.getUserById(userId);
    if (updateUser.email !== payload.currentEmail) {
      await this._userRepository.verifyAvailableEmail(updateUser.email);
    }

    const result = await this._userRepository.updateUser(userId, updateUser);
    return result;
  }
}

module.exports = UpdateUserUseCase;
