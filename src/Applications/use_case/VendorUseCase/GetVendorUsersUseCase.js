class GetVendorUsersUseCase {
  constructor({ vendorRepository, vendorUserRepository }) {
    this._vendorRepository = vendorRepository;
    this._vendorUserRepository = vendorUserRepository;
  }

  async execute(useCasePayload) {
    const { vendorId } = useCasePayload;

    // Verify vendor exists
    await this._vendorRepository.getVendorById(vendorId);

    // Get vendor users
    return this._vendorUserRepository.getVendorUsers(vendorId);
  }
}

module.exports = GetVendorUsersUseCase;
