class UpdateVendorUserUseCase {
  constructor({ vendorRepository, vendorUserRepository, userRepository }) {
    this._vendorRepository = vendorRepository;
    this._vendorUserRepository = vendorUserRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const { vendorId, userId, newRole } = useCasePayload;

    // Verify vendor exists
    await this._vendorRepository.getVendorById(vendorId);

    // Verify user exists
    await this._userRepository.getUserById(userId);

    // Verify user is part of vendor
    await this._vendorUserRepository.verifyVendorUser(vendorId, userId);

    // Update user role
    await this._vendorUserRepository.updateUserRole(vendorId, userId, newRole);
  }
}

module.exports = UpdateVendorUserUseCase;
