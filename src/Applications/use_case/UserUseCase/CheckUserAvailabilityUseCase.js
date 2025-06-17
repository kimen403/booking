class CheckUserAvailabilityUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this._userRepository.getUserById(userId);
    return {
      available: !!user,
      user: user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        : null,
    };
  }
}

module.exports = CheckUserAvailabilityUseCase;
