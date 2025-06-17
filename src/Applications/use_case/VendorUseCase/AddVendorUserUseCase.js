const AddVendorUser = require("../../../Domains/vendors/entities/AddVendorUser");

class AddVendorUserUseCase {
  constructor({ vendorRepository, vendorUserRepository, userRepository }) {
    this._vendorRepository = vendorRepository;
    this._vendorUserRepository = vendorUserRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const addVendorUser = new AddVendorUser(useCasePayload);
    const { vendorId, userId, roleInVendor } = addVendorUser;

    // Verify vendor exists
    await this._vendorRepository.getVendorById(vendorId);

    // Verify user exists
    await this._userRepository.getUserById(userId);

    // Add user to vendor
    await this._vendorUserRepository.addVendorUser(
      vendorId,
      userId,
      roleInVendor
    );
  }
}

module.exports = AddVendorUserUseCase;
