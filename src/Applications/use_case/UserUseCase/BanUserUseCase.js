class BanUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    await this._userRepository.getUserById(userId);
    await this._userRepository.updateUserStatus(userId, "banned");
  }
}

module.exports = BanUserUseCase;
