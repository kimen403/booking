class RejectVendorUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(vendorId, rejectionData) {
    await this._vendorRepository.getVendorById(vendorId);
    return this._vendorRepository.rejectVendor(vendorId, rejectionData);
  }
}

module.exports = RejectVendorUseCase;
