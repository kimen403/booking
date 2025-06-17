class DeleteUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    await this._userRepository.getUserById(userId);
    await this._userRepository.deleteUser(userId);
  }
}

module.exports = DeleteUserUseCase;
