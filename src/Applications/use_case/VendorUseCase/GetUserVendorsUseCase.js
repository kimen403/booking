class GetUserVendorsUseCase {
  constructor({ userRepository, vendorUserRepository }) {
    this._userRepository = userRepository;
    this._vendorUserRepository = vendorUserRepository;
  }

  async execute(useCasePayload) {
    const { userId } = useCasePayload;

    // Verify user exists
    await this._userRepository.getUserById(userId);

    // Get user's vendors
    return this._vendorUserRepository.getUserVendors(userId);
  }
}

module.exports = GetUserVendorsUseCase;
