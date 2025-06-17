class SuspendUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    await this._userRepository.getUserById(userId);
    await this._userRepository.updateUserStatus(userId, "suspended");
  }
}

module.exports = SuspendUserUseCase;
