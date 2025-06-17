const UpdateVendor = require("../../../Domains/vendors/entities/UpdateVendor");

class UpdateVendorUseCase {
  constructor({ vendorRepository }) {
    this._vendorRepository = vendorRepository;
  }

  async execute(vendorId, payload) {
    const updateVendor = new UpdateVendor(payload);
    await this._vendorRepository.checkVendorNameAvailability(
      updateVendor.vendor_name
    );
    return this._vendorRepository.updateVendor(vendorId, updateVendor);
  }
}

module.exports = UpdateVendorUseCase;
