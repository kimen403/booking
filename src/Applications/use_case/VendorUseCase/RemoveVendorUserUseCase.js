class RemoveVendorUserUseCase {
  constructor({ vendorRepository, vendorUserRepository, userRepository }) {
    this._vendorRepository = vendorRepository;
    this._vendorUserRepository = vendorUserRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const { vendorId, userId } = useCasePayload;

    // Verify vendor exists
    await this._vendorRepository.getVendorById(vendorId);

    // Verify user exists
    await this._userRepository.getUserById(userId);

    // Verify user is part of vendor
    await this._vendorUserRepository.verifyVendorUser(vendorId, userId);

    // Get user's role in vendor
    const { role } = await this._vendorUserRepository.getUserRoleInVendor(
      vendorId,
      userId
    );

    // Cannot remove owner
    if (role === "owner") {
      throw new Error("REMOVE_VENDOR_USER.CANNOT_REMOVE_OWNER");
    }

    // Remove user from vendor
    await this._vendorUserRepository.removeVendorUser(vendorId, userId);
  }
}

module.exports = RemoveVendorUserUseCase;
